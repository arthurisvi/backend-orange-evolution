import { v4 as uuidv4 } from "uuid";
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Tail from './Trail'
import { UserTag } from './Enums/UserTag'
import Content from './Content'

export default class User extends BaseModel {
  @beforeCreate()
  public static async addUidHook(user: User) {
    user.id = uuidv4();
  }

  @column({ isPrimary: true })
  public id: string

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public tag: UserTag

  @manyToMany(() => Tail, {
    pivotTable: 'trail_user',
    pivotColumns: ['status'],
  })
  public trails: ManyToMany<typeof Tail>

  @manyToMany(() => Content, {
    pivotTable: 'content_user',
    pivotColumns: ['status', 'favorite'],
  })
  public contents: ManyToMany<typeof Content>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
