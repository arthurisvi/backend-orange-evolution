import { v4 as uuidv4 } from "uuid";
import { DateTime } from 'luxon'
import { BaseModel, column, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { Status } from './Enums/Status'

export default class ContentUser extends BaseModel {
  public static table = 'content_user'

  @beforeCreate()
  public static async addUidHook(contentUser: ContentUser) {
    contentUser.id = uuidv4();
  }

  @column({ isPrimary: true })
  public id: number

  @column()
  public content_id: string

  @column()
  public user_id: string

  @column()
  public status: Status

  @column()
  public favorite: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
