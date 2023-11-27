import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.integer('subscription_package_id').unsigned().references('subscriptions_packages.id').onDelete('CASCADE').notNullable()
      table.integer('payment_method_id').unsigned().references('payment_methods.id').onDelete('CASCADE').notNullable()
      table.tinyint('status').notNullable()
      table.integer('payment').notNullable() 
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now());
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now());
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
