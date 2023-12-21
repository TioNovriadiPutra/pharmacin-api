import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "clinics";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean("cashier_status").notNullable().defaultTo(false);
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("cashier_status");
    });
  }
}
