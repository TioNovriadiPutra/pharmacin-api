import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Clinic from "./Clinic";
import Drug from "./Drug";

export default class DrugFactory extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public factoryName: string;

  @column()
  public factoryEmail?: string;

  @column()
  public factoryPhone?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @manyToMany(() => Clinic, {
    pivotTable: "drug_factory_partners",
  })
  public clinics: ManyToMany<typeof Clinic>;

  @hasMany(()=> Drug)
  public drugs: HasMany<typeof Drug>
}
