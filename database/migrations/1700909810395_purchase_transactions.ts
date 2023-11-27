import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'purchase_transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      // FK
      table.integer('factory_id').unsigned().references('drug_factories.id').onDelete('CASCADE').notNullable()
      table.integer('clinic_id').unsigned().references('clinics.id').onDelete('CASCADE').notNullable()
      // END FK
      table.string('invoice_number', 13).notNullable()
      table.timestamp('purchase_date').notNullable().defaultTo(this.now());
      table.integer('total_price').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
