import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaymentMethod from 'App/Models/PaymentMethod'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await PaymentMethod.createMany([
      {
        methodName: "Cash" 
      },
      {
        methodName: "Credit/Debit" 
      },
      {
        methodName: "QRIS" 
      }
    ])
  }
}
