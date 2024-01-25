import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import SellingShoppingCart from 'App/Models/SellingShoppingCart';
import SellingTransaction from 'App/Models/SellingTransaction';
import AddSellingTransactionValidator from 'App/Validators/AddSellingTransactionValidator';

export default class SellingTransactionsController {
    public async showSellingTransaction({
        request,
        response,
        auth,
    }: HttpContextContract) {
        if (auth.user) {
            var qs = request.qs()

            var clinicId = auth.user.clinicId;
            var page = qs.page ? page : 1;
            var count = qs.count ? count : 10;

            var offset = (page - 1) * count
            var limit = count

            const sellingDataList = await Database.rawQuery(
                'SELECT customer_name, total_price, payment_nominal, change_nominal, created_at FROM selling_transactions WHERE clinic_id = ? LIMIT ? OFFSET ?',
                [clinicId, limit, offset]
            )

            return response.ok({ message: "Data fetched!", data: sellingDataList[0] });
        }
    }

    public async showDetailSellingTransaction({
        request,
        response,
        auth,
    }: HttpContextContract) {
        if (auth.user) {
            var params = request.params()

            var id = params.id;

            const sellingDataHeader = await Database.rawQuery(
                'SELECT customer_name, total_price, payment_nominal, change_nominal, created_at FROM selling_transactions WHERE selling_transactions.id = ?',
                [id]
            )

            const sellingDataDetail = await Database.rawQuery(
                'SELECT quantity, total_price, created_at, item_name, item_price, subtotal_discount FROM selling_shopping_carts WHERE selling_transaction_id = ?',
                [id]
            )

            return response.ok({ message: "Data fetched!", dataHeader: sellingDataHeader[0][0], dataDetail: sellingDataDetail[0] });
        }
    }

    public async addSellingTransaction({
        request,
        response,
        auth,
    }: HttpContextContract) {
        try {
            if (auth.user) {
                const data = await request.validate(AddSellingTransactionValidator);
                var totalPriceCounter = 0
                for(var i in data.selling_item){
                    var item = data.selling_item[i]
                    totalPriceCounter+=(item.quantity*item.item_price)-item.subtotal_discount
                }
                
                if(totalPriceCounter != data.total_price){
                    //throw error price tidak sesuai
                }

                const newSellingTransaction = new SellingTransaction();
                newSellingTransaction.customerName = data.customer_name
                newSellingTransaction.clinicId = auth.user.clinicId
                newSellingTransaction.totalPrice = data.total_price
                newSellingTransaction.paymentNominal = data.payment_nominal
                newSellingTransaction.changeNominal = data.change_nominal
                await newSellingTransaction.save();
                console.log(newSellingTransaction.id)

                for(var i in data.selling_item){
                    var item = data.selling_item[i]
                    var newSellingShoppingCart  = new SellingShoppingCart();
                    newSellingShoppingCart.sellingTransactionId = newSellingTransaction.id
                    newSellingShoppingCart.paymentMethodId = item.payment_method_id
                    newSellingShoppingCart.quantity = item.quantity
                    newSellingShoppingCart.totalPrice = (item.item_price*item.quantity)
                    newSellingShoppingCart.itemName = item.item_name
                    newSellingShoppingCart.itemPrice = item.item_price
                    newSellingShoppingCart.subtotalDiscount = item.subtotal_discount
                    newSellingShoppingCart.save()
                }

                return response.created({
                    message: "Selling Transaction added successfully"
                });

            }
        } catch (error) {
            console.log(error);
            return response.unprocessableEntity(error.messages.errors);
        }
    }

    public async deleteSellingTransaction({
        params,
        response,
        auth,
    }: HttpContextContract) {
        if (auth.user) {
            try {
                const id = params.id
                const dataTransactionHeader = await Database.rawQuery(
                    'SELECT * FROM `selling_transactions` WHERE id = ?',
                    [id]
                )
                const dataTransactionDetail = await Database.rawQuery(
                    'SELECT * FROM selling_shopping_carts WHERE selling_transaction_id = ?',
                    [id]
                )
                await dataTransactionHeader.delete()
                await dataTransactionDetail.delete()
                return response.ok({ message: "Transcation has been deleted!" })
            } catch (error) {
                console.log(error)
                return response.unprocessableEntity(error.messages.errors);
            }
        }
    }
}
