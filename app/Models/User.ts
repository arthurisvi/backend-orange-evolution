import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Tail from './Trail'
import { UserTag } from './Enums/UserTag'
import Content from './Content'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

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
    pivotColumns: ['status'],
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
