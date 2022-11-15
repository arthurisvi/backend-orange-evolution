import Env from '@ioc:Adonis/Core/Env'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserTag } from "App/Models/Enums/UserTag";
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      name: 'Orange Admin',
      email: Env.get('EMAIL_ADMIN'),
      password: Env.get('PASSWORD_ADMIN'),
      tag: UserTag.ADMIN,
    })
  }
}
