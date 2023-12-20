import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payment_methods'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('method_name', 20).notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
