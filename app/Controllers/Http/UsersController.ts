import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async getUserProfile({ response, auth }: HttpContextContract) {
    if (auth.user) {
      const profileData = await User.query()
        .preload("role")
        .preload("profile")
        .where("id", auth.user.id);

      return response.ok({ data: profileData });
    }
  }
}
