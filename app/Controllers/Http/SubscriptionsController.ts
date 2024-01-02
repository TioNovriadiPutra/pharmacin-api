import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import CustomValidationException from 'App/Exceptions/CustomValidationException'
// import Profile from 'App/Models/Profile'
import Subscription from 'App/Models/Subscription'
import SubscribeValidator from 'App/Validators/SubscribeValidator'

export default class SubscriptionsController {
    public async listSubscription({ response }: HttpContextContract) {
        try {
                const allSubs = await Database.rawQuery(
                    'SELECT * FROM subscription_packages ORDER BY id ASC'
                )
                // console.log(allSubs)
                return response.ok({
                    message: "Data Fetched!",
                    data: allSubs[0]
                })
        } catch (error) {
            console.log(error)
            if (error.status === 422) {
                throw new CustomValidationException(false, error.messages);
            }
        }
            
    }
    
    public async subscribe({request, response, auth}: HttpContextContract) {
        try {
            if(auth.user) {
                const body = await request.validate(SubscribeValidator)
                const dataPackage = await Database.rawQuery(
                    'SELECT * FROM subscription_packages ORDER BY id ASC'
                )

                const newSubscription = new Subscription();
                newSubscription.userId = auth.user.id;
                newSubscription.paymentMethodId = body.paket.paymentMethodId;
                newSubscription.subscriptionPackageId = body.paket.subscriptionPackageId;
                newSubscription.status = true
                // Free Trial
                if(body.paket.subscriptionPackageId == dataPackage[0][0].id){ 
                    newSubscription.payment = dataPackage[0][0].price
                }
                // Reguler 
                else if(body.paket.subscriptionPackageId == dataPackage[0][1].id) {
                    newSubscription.payment = dataPackage[0][1].price
                }

                await newSubscription.save()
                return response.created({
                    message: "Subscription bought!",
                    data: newSubscription
                })   
            } else {
                return response.badRequest({message: "Session error"})
            }
        } catch (error) {
            console.log(error)
            if (error.status === 422) {
                throw new CustomValidationException(false, error.messages);
            }
        }
    }
}