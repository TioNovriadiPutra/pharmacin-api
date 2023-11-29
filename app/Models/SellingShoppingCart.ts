import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import PaymentMethod from './PaymentMethod'
import SellingTransaction from './SellingTransaction'

export default class SellingShoppingCart extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public quantity: number

  @column()
  public totalPrice: number

  @column()
  public paymentMethodId: number
  @belongsTo(()=>PaymentMethod)
  public paymentMethods: BelongsTo<typeof PaymentMethod>
  
  @column()
  public sellingTransactionId: number
  @belongsTo(()=>SellingTransaction)
  public sellingTransactions: BelongsTo<typeof SellingTransaction>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
