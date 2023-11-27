import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'stock_per_batches'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('stock_id').unsigned().references('stocks.id').onDelete('CASCADE').notNullable()
      table.integer('drug_id').unsigned().references('drugs.id').onDelete('CASCADE').notNullable()
      table.integer('drug_drugcategory_id').unsigned().references('drugs.drug_category_id').onDelete('CASCADE').notNullable()
      table.integer('stock').notNullable()
      table.integer('stock_active').notNullable()
      table.date('expired').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
