import { DateTime } from "luxon";
import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Clinic from "./Clinic";

export default class SellingTransaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public customerName: string;

  @column()
  public totalPrice: number;

  @column()
  public paymentNominal: number;

  @column()
  public changeNominal: number;

  @column()
  public clinicId: number;

  @belongsTo(() => Clinic)
  public clinic: BelongsTo<typeof Clinic>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
