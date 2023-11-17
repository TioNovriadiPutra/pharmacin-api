import { DateTime } from "luxon";
import {
  BaseModel,
  HasMany,
  ManyToMany,
  column,
  hasMany,
  manyToMany,
} from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import DrugFactory from "./DrugFactory";

export default class Clinic extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clinicName: string;

  @column()
  public clinicPhone?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => User)
  public employees: HasMany<typeof User>;

  @manyToMany(() => DrugFactory, {
    pivotTable: "drug_factory_partners",
  })
  public drugFactories: ManyToMany<typeof DrugFactory>;
}
