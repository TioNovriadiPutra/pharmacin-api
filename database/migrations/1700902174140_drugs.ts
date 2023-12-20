import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'drugs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // - FK factory
      table.integer('drug_factory_id').unsigned().references('drug_factories.id').onDelete('CASCADE').notNullable()
      table.integer('drug_category_id').unsigned().references('drug_categories.id').onDelete('CASCADE').notNullable()
      table.string('name', 100).notNullable()
      table.string('generic_name', 100)
      table.string('dose', 50)
      table.integer('shelve')
      table.integer('selling_price')
      table.integer('purchase_price')
      table.timestamp('created_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
