import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class StockPerBatchesController {
    public async showStockPerBatches({request, response, params}: HttpContextContract) {
        try {
            const stock = await Database.rawQuery(
                'SELECT * FROM stock_per_batches WHERE stock_id = ?',

            )
            
            return response.ok({message: "Stock has been added successfully"})
        } catch (error) {
            console.log(error)
        }
            
    }
}
