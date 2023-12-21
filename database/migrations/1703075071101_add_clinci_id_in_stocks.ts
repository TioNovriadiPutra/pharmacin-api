import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "stocks";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .integer("clinic_id")
        .unsigned()
        .references("clinics.id")
        .onDelete("CASCADE")
        .notNullable();
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign("clinic_id");
      table.dropColumn("clinic_id");
    });
  }
}
