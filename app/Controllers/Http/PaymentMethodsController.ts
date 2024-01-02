import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';

export default class PaymentMethodsController {
    public async index({ response }: HttpContextContract) {
        try {
          const allPaymentMethods = await Database.rawQuery(
            'SELECT * FROM payment_methods '
          );
    
          return response.ok({
            message: "Data fetched!",
            data: allPaymentMethods,
          });
        } catch (error) {
          return response.badGateway(error);
        }
      }
}
