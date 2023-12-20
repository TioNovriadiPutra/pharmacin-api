import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clinic from 'App/Models/Clinic';
import DrugCategory from 'App/Models/DrugCategory';
import AddDrugCategoryValidator from 'App/Validators/AddDrugCategoryValidator'


export default class DrugCategoriesController {
    public async addDrugCategory({
        request, response, auth,
    }: HttpContextContract) {
        try{
            const data = await request.validate(AddDrugCategoryValidator);
            const clinic = await Clinic.findOrFail(auth.user?.clinicId)
            console.log(data)
            console.log(clinic)

            const newCategory = new DrugCategory();
            newCategory.categoryName = data.categoryName;
            
            await clinic.related('categories').save(newCategory)

            return response.created({message: "New Category has been added succesfully", data: data})
        } catch(error) {
            console.log(error)
            return response.unprocessableEntity(error.messages.errors);
        }
    }
    public async showClinicDrugCategories({
        response,
        auth,
      }: HttpContextContract) {
        if (auth.user) {
          const clinicId = auth.user.clinicId;
    
          const categoriesData = await Clinic.query().preload('drugFactories').where('clinic_id', clinicId)
    
          return response.ok({
            message: "Data fetched!",
            data: categoriesData,
          });
        }
      }
}