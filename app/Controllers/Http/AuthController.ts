import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { Gender } from "App/Enums/Gender";
import { Role } from "App/Enums/Role";
import UnAuthorizedException from "App/Exceptions/UnAuthorizedException";
import Clinic from "App/Models/Clinic";
import Profile from "App/Models/Profile";
import User from "App/Models/User";
import LoginValidator from "App/Validators/LoginValidator";
import RegisterEmployeeValidator from "App/Validators/RegisterEmployeeValidator";
import RegisterValidator from "App/Validators/RegisterValidator";

export default class AuthController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterValidator);

      const newClinic = new Clinic();
      newClinic.clinicName = data.clinicName;
      newClinic.clinicPhone = data.clinicPhone;

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role.ADMIN;

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.gender = data.gender as Gender;
      newProfile.phone = data.phone;

      await newClinic.related("employees").save(newUser);

      await newUser.related("profile").save(newProfile);

      return response.created({
        message: "Registration success!",
      });
    } catch (error) {
      return response.badRequest(error.messages.errors);
    }
  }

  public async registerEmployee({
    request,
    response,
    params,
    bouncer,
  }: HttpContextContract) {
    try {
      const data = await request.validate(RegisterEmployeeValidator);

      if (await bouncer.with("AuthPolicy").denies("before"))
        throw new UnAuthorizedException("Account don't have access!", 403);

      const newUser = new User();
      newUser.email = data.email;
      newUser.password = data.password;
      newUser.roleId = Role.USER;
      newUser.clinicId = params.id;

      const newProfile = new Profile();
      newProfile.fullName = data.fullName;
      newProfile.gender = data.gender as Gender;
      newProfile.phone = data.phone;

      await newUser.related("profile").save(newProfile);

      return response.created({ message: "Employee added!" });
    } catch (error) {
      if (error.status === 422) {
        return response.unprocessableEntity(error.messages.errors);
      } else if (error.status === 403) {
        return response.forbidden({ message: error.message });
      }
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const data = await request.validate(LoginValidator);

      const token = await auth.use("api").attempt(data.email, data.password);

      return response.ok({
        message: "Login success!",
        token: token.token,
        userId: token.user.id,
        roleId: token.user.roleId,
      });
    } catch (error) {
      if (error.responseText) {
        return response.unauthorized({
          message: "Email or Password incorrect!",
        });
      } else {
        return response.badRequest({
          message: error.messages.errors[0].message,
        });
      }
    }
  }
}
