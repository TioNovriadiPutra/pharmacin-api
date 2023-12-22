import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import SubscriptionPackage from 'App/Models/SubscriptionPackage'

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await SubscriptionPackage.createMany([
      {
        packageName: "Free Trial",
        price: 0,
        month: 0
      },
      {
        packageName: "Reguler",
        price: 270000,
        month: 3
      },
      {
        packageName: "Free Trial",
        price: 0,
        month: 0
      },
      {
        packageName: "Free Trial",
        price: 0,
        month: 0
      },
    ])
  }
}
