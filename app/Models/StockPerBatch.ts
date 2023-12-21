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
import Stock from "./Stock";
import StockOpname from "./StockOpname";
import DrugCategory from "./DrugCategory";

export default class StockPerBatch extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public stock: number;

  @column()
  public stockActive: number;

  @column.date()
  public expired: DateTime;

  @column()
  public stockId: number;

  @column()
  public drugId: number;

  @column()
  public drugDrugCategoryId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Drug)
  public drug: BelongsTo<typeof Drug>;

  @belongsTo(() => DrugCategory)
  public drugCategory: BelongsTo<typeof DrugCategory>;

  @belongsTo(() => Stock)
  public mainStock: BelongsTo<typeof Stock>;

  @hasMany(() => StockOpname)
  public stock_per_batch_id: HasMany<typeof StockOpname>;
}
