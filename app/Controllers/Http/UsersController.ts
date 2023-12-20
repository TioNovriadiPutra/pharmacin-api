import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  public async getUserProfile({ response, params }: HttpContextContract) {
    const profileData = await User.query()
      .preload("role")
      .preload("profile")
      .where("id", params.id);

    return response.ok({ data: profileData });
  }
}
