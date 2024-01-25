import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'selling_shopping_carts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('item_name', 100).notNullable()
      table.integer('item_price').notNullable().defaultTo(0)
      table.integer('subtotal_discount').notNullable().defaultTo(0)
    });
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('item_name');
      table.dropColumn('item_price');
      table.dropColumn('subtotal_discount');
    });
  }
}
