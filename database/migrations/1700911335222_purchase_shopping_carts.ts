import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_shopping_carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('drug_id').unsigned().references('drugs.id').onDelete('CASCADE').notNullable()
      table.integer('drug_category_id').unsigned().references('drugs.drug_category_id').onDelete('CASCADE').notNullable()
      table.integer('purchase_transaction_id').unsigned().references('purchase_transactions.id').onDelete('CASCADE').notNullable()
      table.date('expired').notNullable()
      table.integer('quantity').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
