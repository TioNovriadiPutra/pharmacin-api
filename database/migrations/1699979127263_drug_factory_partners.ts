import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "drug_factory_partners";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("clinic_id")
        .unsigned()
        .references("clinics.id")
        .nullable()
        .onDelete("SET NULL");
      table
        .integer("drug_factory_id")
        .unsigned()
        .references("drug_factories.id")
        .nullable()
        .onDelete("SET NULL");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
