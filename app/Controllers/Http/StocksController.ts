import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Stock from 'App/Models/Stock';
import AddStockValidator from 'App/Validators/AddStockValidator'

export default class StocksController {
    public async addStocks({request, response, params}: HttpContextContract) {
        try {

            const data = await request.validate(AddStockValidator)
            const newStock = new Stock();
            newStock.totalStock = data.totalStock;
            newStock.drugId = data.drugId;
            newStock.drugCategoryId = data.drugCategoryId;
            
            await newStock.save()
            
            return response.ok({message: "Stock has been added successfully"})
        } catch (error) {
            console.log(error)
        }
            
    }
    public async showStockByItem({response, auth}: HttpContextContract) {
        if(auth.user){
            const data = await Database.rawQuery(
                "SELECT dr.*, st.total_stock, df.factory_name FROM drugs dr JOIN stocks st ON st.drug_id = dr.id JOIN drug_factories df ON dr.factory_id = df.id"
            )
            return response.ok({message: "data fetched", data: data})
        } else {
            return response.unauthorized({message:"Unauthorized User"});
        }
    }

    // ongoing
    public async showStockByBatch({response, auth}: HttpContextContract) {
        if(auth.user){
            const data = await Database.rawQuery(
                "SELECT dr.*, st.total_stock, df.factory_name FROM drugs dr JOIN stocks st ON st.drug_id = dr.id JOIN drug_factories df ON dr.factory_id = df.id"
            )
            return response.ok({message: "data fetched", data: data})
        } else {
            return response.unauthorized({message:"Unauthorized User"});
        }
    }
    
}
