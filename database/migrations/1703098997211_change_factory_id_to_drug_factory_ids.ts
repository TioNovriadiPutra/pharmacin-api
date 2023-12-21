import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "purchase_transactions";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn("factory_id", "drug_factory_id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.renameColumn("drug_factory_id", "factory_id");
    });
  }
}
