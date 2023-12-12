import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DrugFactory from './DrugFactory'
import Clinic from './Clinic'
import PurchaseShoppingCart from './PurchaseShoppingCart'

export default class PurchaseTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public invoiceNumber: string

  @column.dateTime()
  public purchaseDate: DateTime

  @column()
  public totalPrice: number

  @belongsTo(() => DrugFactory)
  public drugFactory: BelongsTo<typeof DrugFactory>

  @column()
  public drugFactoryId: number

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>

  @column()
  public clinicId: number

  @hasMany(() => PurchaseShoppingCart)
  public purchaseShoppingCarts: HasMany<typeof PurchaseShoppingCart>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
