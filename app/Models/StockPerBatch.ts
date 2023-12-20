import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Drug from './Drug'
import Stock from './Stock'
import StockOpname from './StockOpname'

export default class StockPerBatch extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public stock: number

  @column()
  public stockActive: number

  @column()
  public expired: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Drug)
  public drug_id: BelongsTo<typeof Drug>

  @belongsTo(() => Drug)
  public drug_drugcategory_id: BelongsTo<typeof Drug>
  
  @belongsTo(() => Stock)
  public stock_id: BelongsTo<typeof Stock>
  
  @hasMany(() => StockOpname)
  public stock_per_batch_id: HasMany<typeof StockOpname>
}
