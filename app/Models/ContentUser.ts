import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { Status } from './Enums/Status'

export default class ContentUser extends BaseModel {
  public static table = 'content_user'
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: Status

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
