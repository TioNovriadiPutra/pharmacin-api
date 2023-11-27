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
  public generic_name: string;
  
  @column()
  public dose: string;

  @column()
  public shelve: number;
  
  @column()
  public selling_price: number;
  
  @column()
  public purchase_price: number;
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => DrugFactory)
  public factory_id: BelongsTo<typeof DrugFactory>

  @belongsTo(() => DrugCategory)
  public drug_category_id: BelongsTo<typeof DrugCategory>
}