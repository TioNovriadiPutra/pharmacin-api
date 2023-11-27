import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'selling_shopping_carts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('selling_transaction_id').unsigned().references('selling_transactions.id').onDelete('CASCADE').notNullable()
      table.integer('payment_method_id').unsigned().references('payment_methods.id').onDelete('CASCADE').notNullable()
      table.integer('quantity').notNullable()
      table.integer('total_price').notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
