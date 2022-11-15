import { v4 as uuidv4 } from "uuid";
import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, beforeCreate, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Content from './Content'
import User from "./User";

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

  @manyToMany(() => User, {
    pivotTable: 'trail_user',
    pivotColumns: ['status'],
  })
  public users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
