import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class SubscriptionsController {
    public async listSubscription({request, response, params, auth}: HttpContextContract) {
        try {
            if(auth.user){
                const userId = auth.user.id
                const allSubs = await Database.rawQuery(
                    'SELECT s.*, sp.*, pm.method_name FROM subscriptions s LEFT JOIN subscriptions_packages sp ON s.subscription_package_id = sp.id LEFT JOIN payment_methods pm ON s.payment_method_id = pm.id WHERE user_id = ?'
                    , [userId]
                ) 
                console.log(allSubs)
                if(!allSubs) {
                    
                } else {
                    return response.ok({message: "Subs details of a clinic"})
                }
            }
        } catch (error) {
            console.log(error)
        }
            
    }
}
