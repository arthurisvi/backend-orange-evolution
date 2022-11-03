import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { category } from './Enums/ContentCategory';
import Trail from './Trail';

export default class Content extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string;

  @column()
  public type: string;

  @column()
  public duration: string;

  @column()
  public link: string;

  @column()
  public author: string;

  @column()
  public category: category;

  @column()
  public trailId: number;

  @belongsTo(() => Trail)
  public trail: BelongsTo<typeof Trail>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
