import { DateTime } from "luxon";
import {
  BaseModel,
  ManyToMany,
  column,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import Clinic from "./Clinic";

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
}
