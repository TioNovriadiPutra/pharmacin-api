import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import DrugFactory from './DrugFactory';
import DrugCategory from './DrugCategory';

export default class Drug extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public genericName?: string;
  
  @column()
  public dose?: string;

  @column()
  public shelve?: number;
  
  @column()
  public sellingPrice: number;
  
  @column()
  public purchasePrice: number;

  @column()
  public fnhactoryId: number
  @belongsTo(() => DrugFactory)
  public factory: BelongsTo<typeof DrugFactory>

  @column()
  public drugCategoryId: number
  @belongsTo(() => DrugCategory)
  public drugCategory: BelongsTo<typeof DrugCategory>
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}