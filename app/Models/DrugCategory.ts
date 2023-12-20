import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Clinic from './Clinic'
import Drug from './Drug'

export default class DrugCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoryName: string

  @column()
  public clinicId: number
  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Drug)
  public drugs: HasMany<typeof Drug>
}