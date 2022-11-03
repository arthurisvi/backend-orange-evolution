import User from "App/Models/User";
import UserDTO from "App/DTOs/UserDTO";

export default interface UserRepositoryInterface {

  createUser(newUser: UserDTO): Promise<User>

}
