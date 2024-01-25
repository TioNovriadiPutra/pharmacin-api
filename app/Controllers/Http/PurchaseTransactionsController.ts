import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import PurchaseShoppingCart from 'App/Models/PurchaseShoppingCart';
import PurchaseTransaction from 'App/Models/PurchaseTransaction';
import AddPurchaseTransactionValidator from 'App/Validators/AddPurchaseTransactionValidator';
const moment = require('moment');


export default class PurchaseTransactionsController {
    public async showPurchaseTransaction({
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

            const purchaseDataList = await Database.rawQuery(
                'SELECT purchase_transactions.id,invoice_number,purchase_date,factory_name,total_price FROM purchase_transactions JOIN drug_factories ON purchase_transactions.drug_factory_id = drug_factories.id WHERE clinic_id = ? LIMIT ? OFFSET ?',
                [clinicId, limit, offset]
            )

            return response.ok({ message: "Data fetched!", data: purchaseDataList[0] });
        }
    }

    public async showDetailPurchaseTransaction({
        request,
        response,
        auth,
    }: HttpContextContract) {
        if (auth.user) {
            var params = request.params()

            var id = params.id;

            const purchaseDataHeader = await Database.rawQuery(
                'SELECT factory_name,clinic_name,invoice_number,purchase_date,total_price FROM purchase_transactions JOIN drug_factories ON purchase_transactions.drug_factory_id = drug_factories.id JOIN clinics ON purchase_transaction.clinic_id = clinics.id WHERE purchase_transactions.id = ?',
                [id]
            )

            const purchaseDataDetail = await Database.rawQuery(
                'SELECT	drug_name, drug_generic_name, drug_category_name, purchase_price, expired, quantity, subtotal_discount FROM purchase_shopping_carts WHERE purchase_transaction_id = ?',
                [id]
            )

            return response.ok({ message: "Data fetched!", dataHeader: purchaseDataHeader[0][0], dataDetail: purchaseDataDetail[0] });
        }
    }

    public async addPurchaseTransaction({
        request,
        response,
        auth,
    }: HttpContextContract) {
        try {
            if (auth.user) {
                const data = await request.validate(AddPurchaseTransactionValidator);
                const drugDetail = await Database.rawQuery(
                    'SELECT	drugs.id as drug_id,drugs.name as drug_name, generic_name, drug_categories.id as category_id, category_name FROM drugs JOIN drug_categories ON drugs.drug_category_id = drug_categories.id WHERE clinic_id = ?',
                    [auth.user.clinicId]
                )
                console.log("data request", data)
                
                console.log("data drug", drugDetail)
                var totalPrice = 0
                
                var drugsList = {}
                
                for(var i in drugDetail[0]){
                    drugsList[drugDetail[0][i].drug_id] = drugDetail[0][i]
                }

                for(var i in data.purchase_item){
                    var item = data.purchase_item[i]
                    totalPrice+=(item.quantity*item.drug_purchase_price)-item.subtotal_discount
                }
                
                var date = new Date();
                var month = date.getMonth()
                var year = date.getFullYear()
                
                const newPurchaseTransaction = new PurchaseTransaction();
                newPurchaseTransaction.drugFactoryId = data.drug_factory_id
                newPurchaseTransaction.clinicId = auth.user.clinicId
                newPurchaseTransaction.purchaseDate = data.purchase_date
                newPurchaseTransaction.totalPrice = totalPrice
                await newPurchaseTransaction.save();
                console.log(newPurchaseTransaction.id)
                newPurchaseTransaction.invoiceNumber = "INV/"+year+"/"+month+"/"+newPurchaseTransaction.id
                await newPurchaseTransaction.save();

                console.log("DRUGS LIST", drugsList)

                for(var i in data.purchase_item){
                    var item = data.purchase_item[i]
                    var newPurchaseShoppingCart  = new PurchaseShoppingCart();
                    newPurchaseShoppingCart.drugId = item.drug_id
                    newPurchaseShoppingCart.DrugCategoryId = drugsList[item.drug_id].category_id
                    newPurchaseShoppingCart.purchaseTransactionId = newPurchaseTransaction.id
                    newPurchaseShoppingCart.expired = moment(item.expired).format('YYYY-MM-DD')
                    newPurchaseShoppingCart.quantity = item.quantity
                    newPurchaseShoppingCart.drugName = drugsList[item.drug_id].drug_name
                    newPurchaseShoppingCart.drugGenericName = drugsList[item.drug_id].generic_name
                    newPurchaseShoppingCart.drugCategoryName = drugsList[item.drug_id].category_name
                    newPurchaseShoppingCart.purchasePrice = item.drug_purchase_price
                    newPurchaseShoppingCart.subtotalDiscount = item.subtotal_discount
                    newPurchaseShoppingCart.save()
                }

                return response.created({
                    message: "Purchase Transaction added successfully"
                });

            }
        } catch (error) {
            console.log(error);
            return response.unprocessableEntity(error.messages.errors);
        }
    }

    public async deletePurchaseTransaction({
        params,
        response,
        auth,
    }: HttpContextContract) {
        if (auth.user) {
            try {
                const id = params.id
                const dataTransactionHeader = await Database.rawQuery(
                    'SELECT * FROM `purchase_transactions` WHERE id = ?',
                    [id]
                )
                const dataTransactionDetail = await Database.rawQuery(
                    'SELECT * FROM purchase_shopping_carts WHERE purchase_transaction_id = ?',
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


