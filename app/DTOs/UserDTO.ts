import { UserTag } from "App/Models/Enums/UserTag";

export default class UserDTO {
  name: string;
  email: string;
  password: string;
  tag: UserTag;
}
