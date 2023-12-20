import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import PaymentMethod from './PaymentMethod'
import SubscriptionPackage from './SubscriptionPackage'

export default class Subscription extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public startDate: DateTime

  @column()
  public endDate: DateTime

  @column()
  public status: boolean

  @column()
  public payment: number

  @column()
  public userId: number
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column()
  public paymentMethodId: number
  @belongsTo(() => PaymentMethod)
  public paymentMethod: BelongsTo<typeof PaymentMethod>

  @column()
  public subscriptionPackageId: number
  @belongsTo(() => SubscriptionPackage)
  public SubscriptionPackage: BelongsTo<typeof SubscriptionPackage>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
