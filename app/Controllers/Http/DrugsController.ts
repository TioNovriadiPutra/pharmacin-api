import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Drug from "App/Models/Drug";
import AddDrugValidator from "App/Validators/AddDrugValidator";
import Database from "@ioc:Adonis/Lucid/Database";
import DrugCategory from "App/Models/DrugCategory";
import StoreDrugCategoryValidator from "App/Validators/StoreDrugCategoryValidator";
import CustomValidationException from "App/Exceptions/CustomValidationException";

export default class DrugFactoryController {
  public async showClinicDrugCategories({
    response,
    auth,
  }: HttpContextContract) {
    if (auth.user) {
      const drugCategoryData = await DrugCategory.query().where(
        "clinic_id",
        auth.user.clinicId
      );

      return response.ok({ message: "Data fetched!", data: drugCategoryData });
    }
  }

  public async storeDrugCategory({
    request,
    response,
    auth,
  }: HttpContextContract) {
    if (auth.user) {
      try {
        const data = await request.validate(StoreDrugCategoryValidator);

        const newDrugCategory = new DrugCategory();
        newDrugCategory.categoryName = data.categoryName;
        newDrugCategory.clinicId = auth.user.clinicId;

        await newDrugCategory.save();

        return response.created({ message: "Kategori berhasil ditambahkan!" });
      } catch (error) {
        if (error.status === 422) {
          throw new CustomValidationException(false, error.messages);
        }
      }
    }
  }

  public async addDrug({ request, response, auth }: HttpContextContract) {
    try {
      if (auth.user) {
        const data = await request.validate(AddDrugValidator);

        const clinicData = await Database.rawQuery(
          "SELECT cl.*, dc.category_name, dc.id AS kamrol, dfp.* FROM clinics cl LEFT JOIN drug_categories dc ON dc.clinic_id = cl.id LEFT JOIN drug_factory_partners dfp ON cl.id = dfp.clinic_id WHERE cl.id = ?",
          [auth.user.clinicId]
        );

        const newDrug = new Drug();
        newDrug.name = data.name;
        newDrug.genericName = data.genericName;
        newDrug.dose = data.dose;
        newDrug.shelve = data.shelve;
        newDrug.sellingPrice = data.sellingPrice;
        newDrug.purchasePrice = data.purchasePrice;
        newDrug.drugCategoryId = data.drugCategoryId;
        newDrug.drugFactoryId = data.drugFactoryId;

        await newDrug.save();

        return response.created({
          message: "Drug added successfully",
          data: clinicData,
        });
      }
    } catch (error) {
      console.log(error);
      return response.unprocessableEntity(error.messages.errors);
    }
  }

  public async showDrugs({ response, auth }: HttpContextContract) {
    if (auth.user) {
      const drugsData = await Database.rawQuery("SELECT * FROM drugs");

      return response.ok({
        message: "Data fetched!",
        data: drugsData,
      });
    }
  }
}
