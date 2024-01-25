import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Drug from './Drug'
import PurchaseTransaction from './PurchaseTransaction'

export default class PurchaseShoppingCart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public expired: Date

  @column()
  public quantity: number

  @column()
  public drugName: string;

  @column()
  public drugGenericName: string;

  @column()
  public drugCategoryName: string;

  @column()
  public purchasePrice: number

  @column()
  public subtotalDiscount: number

  @column()
  public drugId: number
  @belongsTo(() => Drug)
  public drug: BelongsTo<typeof Drug>

  @column()
  public DrugCategoryId: number
  @belongsTo(() => Drug)
  public drugCategory: BelongsTo<typeof Drug>

  @column()
  public purchaseTransactionId: number
  @belongsTo(() => PurchaseTransaction)
  public purchaseTransaction: BelongsTo<typeof PurchaseTransaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

}
