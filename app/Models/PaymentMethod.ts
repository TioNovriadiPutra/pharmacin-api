import { DateTime } from 'luxon'
import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import SellingShoppingCart from './SellingShoppingCart'
import Subscription from './Subscription'

export default class PaymentMethod extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public methodName: string

  @hasMany(() => Subscription)
  public subscriptions: HasMany<typeof Subscription>

  @hasMany(() => SellingShoppingCart)
  public sellingShoppingCarts: HasMany<typeof SellingShoppingCart>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
