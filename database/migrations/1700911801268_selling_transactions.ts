import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'selling_transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('clinic_id').unsigned().references('clinics.id').onDelete('CASCADE').notNullable()
      table.string('customer_name', 50).notNullable()
      table.integer('total_price').notNullable()
      table.integer('payment_nominal').notNullable()
      table.integer('change_nominal').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
