import { DateTime } from "luxon";
import {
  BaseModel,
  BelongsTo,
  HasMany,
  belongsTo,
  column,
  hasMany,
} from "@ioc:Adonis/Lucid/Orm";
import Drug from "./Drug";
import DrugCategory from "./DrugCategory";
import Clinic from "./Clinic";
import StockPerBatch from "./StockPerBatch";

export default class Stock extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public totalStock: number;

  @column()
  public drugId: number;

  @column()
  public drugDrugcategoryId: number;

  @column()
  public clinicId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Drug)
  public drug: BelongsTo<typeof Drug>;

  @belongsTo(() => DrugCategory)
  public drugCategory: BelongsTo<typeof DrugCategory>;

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>;

  @hasMany(() => StockPerBatch)
  public stockBatches: HasMany<typeof StockPerBatch>;
}
