import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Clinic from './Clinic'
import Drug from './Drug'

export default class DrugCategory extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_name: string

  @column()
  public clinicId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Clinic)
  public clinic_id: BelongsTo<typeof Clinic>;

  @hasMany(() => Drug)
  public drug_id: HasMany<typeof Drug>
}