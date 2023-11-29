import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class SubscriptionPackage extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public packageName: string

  @column()
  public price: number

  @column()
  public month: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
