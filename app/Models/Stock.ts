import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  HasOne,
  belongsTo,
  column,
  hasMany,
  hasOne,
} from "@ioc:Adonis/Lucid/Orm";
import Drug from "./Drug";
import DrugCategory from "./DrugCategory";
import Clinic from "./Clinic";
import StockPerBatch from "./StockPerBatch";


export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public totalStock: number

  @column()
  public drugId: number

  @column()
  public drugCategoryId: number

  @column()
  public clinicId: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Drug)
  public drug: HasOne<typeof Drug>

  @hasOne(() => Drug)
  public drugCategory: HasOne<typeof Drug>

  @hasMany(() => StockPerBatch)
  public stockBatches: HasMany<typeof StockPerBatch>

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>
}