import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Drug from 'App/Models/Drug';
import DrugFactory from 'App/Models/DrugFactory';
import showClinicDrugFactories from 'App/Controllers/Http/DrugFactoriesController'
import AddDrugValidator from 'App/Validators/AddDrugValidator';
import DrugCategory from 'App/Models/DrugCategory';
import Clinic from 'App/Models/Clinic';
import Database from '@ioc:Adonis/Lucid/Database';

export default class DrugFactoryController {
    public async addDrug({
        request, response, params, auth
    }: HttpContextContract){
        try{ 
            if(auth.user){
                const data = await request.validate(AddDrugValidator);
                const clinicData = await Database.rawQuery(
                    'SELECT cl.*, dc.category_name, dc.id AS kamrol, dfp.* FROM clinics cl LEFT JOIN drug_categories dc ON dc.clinic_id = cl.id LEFT JOIN drug_factory_partners dfp ON cl.id = dfp.clinic_id WHERE cl.id = ?',
                    [auth.user.clinicId]
                    )
                console.log("data: ", clinicData)
                console.log("request data", data)
                const newDrug = new Drug();
                newDrug.name = data.name;
                newDrug.genericName = data.genericName;
                newDrug.dose = data.dose;
                newDrug.shelve = data.shelve;
                newDrug.sellingPrice = data.sellingPrice;
                newDrug.purchasePrice = data.purchasePrice;
                
                newDrug.drugCategoryId = data.drugCategoryId
                newDrug.factoryId = data.factoryId
                await newDrug.save()
                // return response.json({data: clinicData})
                return response.created({message: "Drug added successfully", data: data})
            }
        } catch(error){
            console.log(error)
            return response.unprocessableEntity(error.messages.errors);
        }
    }
   
    public async showClinicDrugs({
        response, auth
    }: HttpContextContract) {
        if(auth.user){
            const clinicId = auth.user.clinicId

            const drugsData = await Drug.query().preload("factory").where('clinic_id', clinicId)

            return response.ok({
                message: "Data fetched!",
                data: drugsData
            })
        }
    }
}