import UserRepositoryInterface from "App/Interfaces/UserRepositoryInterface";
import UserDTO from "App/DTOs/UserDTO";
import User from "App/Models/User";

export default class UserRepository implements UserRepositoryInterface{

  public async createUser(newUser: UserDTO): Promise<User> {
    const user = await User.create(newUser)

    return Promise.resolve(user);
  }
}
