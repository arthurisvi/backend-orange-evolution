import UserRepository from "App/Repositories/UserRepository";
import User from "App/Models/User";
import UserDTO from "App/DTOs/UserDTO";

class UserService{
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(newUser: UserDTO): Promise<User> {
    return this.userRepository.createUser(newUser);
  }

}

export default new UserService();
