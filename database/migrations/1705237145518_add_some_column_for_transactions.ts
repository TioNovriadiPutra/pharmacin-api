import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_shopping_carts'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('drug_name', 100).notNullable()
      table.string('drug_generic_name', 100).nullable()
      table.string('drug_category_name', 100).notNullable()
      table.integer('purchase_price').notNullable().defaultTo(0)
      table.integer('subtotal_discount').notNullable().defaultTo(0)
    });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("drug_name");
      table.dropColumn("drug_generic_name");
      table.dropColumn("drug_category_name");
      table.dropColumn("purchase_price");
      table.dropColumn("subtotal_discount");
    });
  }
}
