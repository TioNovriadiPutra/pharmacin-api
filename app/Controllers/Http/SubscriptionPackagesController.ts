import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SubscriptionPackagesController {
    public async showListPackages({request, response}: HttpContextContract) {
        try {
            const packages = await Database.rawQuery(
                'SELECT * FROM subscriptions_packages ORDER BY id'
            )
            console.log(packages)
            return response.ok({message: "Data fetched"})
        } catch (error) {
            console.log(error)
        }
            
    }
}
