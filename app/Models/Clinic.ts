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
import DrugCategory from "./DrugCategory";
import SellingTransaction from "./SellingTransaction";
import Stock from "./Stock";

export default class Clinic extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public clinicName: string;

  @column()
  public clinicPhone?: string;

  @column({
    serialize: (value: number) => {
      return Boolean(value);
    },
  })
  public cashierStatus: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => User)
  public employees: HasMany<typeof User>;

  @hasMany(() => SellingTransaction)
  public sellingTransactions: HasMany<typeof SellingTransaction>;

  @hasMany(() => DrugCategory)
  public categories: HasMany<typeof DrugCategory>;

  @hasMany(() => Stock)
  public stocks: HasMany<typeof Stock>;

  @manyToMany(() => DrugFactory, {
    pivotTable: "drug_factory_partners",
  })
  public drugFactories: ManyToMany<typeof DrugFactory>;
}
