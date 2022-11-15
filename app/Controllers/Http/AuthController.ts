// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { UserTag } from "App/Models/Enums/UserTag";
import User from "../../Models/User"
import UserDTO from "App/DTOs/UserDTO";
import UserService from "App/Services/UserService";

export default class AuthController {

  public async login({ request, auth, response}: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");
    const token = await auth.use("api").attempt(email, password, {
      expiresIn: "10 days",
    });

    const user = await User.query().where('email', email).first()

    return response.status(200).send({ token, user });
  }

  public async register({ request, auth, response }: HttpContextContract) {
    const { email, password, name } = request.all()

    try {

      const user: UserDTO = {
        name,
        email,
        password,
        tag: UserTag.MEMBER
      }

      const userCreated = await UserService.createUser(user);

      const token = await auth.use("api").login(userCreated, {
        expiresIn: "10 days",
      });

      return response.status(200).send(token.toJSON())
    } catch (error) {
      console.log(error)
    }
  }
}
