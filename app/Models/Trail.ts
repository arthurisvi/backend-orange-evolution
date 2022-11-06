import { v4 as uuidv4 } from "uuid";
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import Content from './Content'

export default class Trail extends BaseModel {
  @beforeCreate()
  public static async addUidHook(trail: Trail) {
    trail.id = uuidv4();
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public description:string

  @column()
  public estimatedTime: number

  @hasMany(() => Content)
  public contents: HasMany<typeof Content>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
