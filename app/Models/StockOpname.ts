import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import StockPerBatch from './StockPerBatch'
import Drug from './Drug'

export default class StockOpname extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public adjustment_price: number

  @column()
  public stock_difference: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(()=>StockPerBatch)
  public stock_per_batch_id: BelongsTo<typeof StockPerBatch>

  @belongsTo(() => Drug)
  public drug_id: BelongsTo<typeof Drug>
  public drug_drugcategory_id: BelongsTo<typeof Drug>
}
