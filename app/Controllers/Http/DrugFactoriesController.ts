import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import CustomValidationException from "App/Exceptions/CustomValidationException";
import DataNotFoundException from "App/Exceptions/DataNotFoundException";
import Clinic from "App/Models/Clinic";
import DrugFactory from "App/Models/DrugFactory";
import AddDrugFactoryValidator from "App/Validators/AddDrugFactoryValidator";

export default class DrugFactoriesController {
  public async addDrugFactory({
    request,
    response,
    auth,
  }: HttpContextContract) {
    try {
      const data = await request.validate(AddDrugFactoryValidator);

      const newDrugFactory = new DrugFactory();
      newDrugFactory.factoryName = data.factoryName;
      newDrugFactory.factoryEmail = data.factoryEmail;
      newDrugFactory.factoryPhone = data.factoryPhone;

      await newDrugFactory.save();

      if (auth.user)
        await newDrugFactory.related("clinics").sync([auth.user.clinicId]);

      return response.created({ message: "Drug factory added!" });
    } catch (error) {
      if (error.status === 422) {
        throw new CustomValidationException(false, error.messages);
      }
    }
  }

  public async showClinicDrugFactories({
    response,
    auth,
  }: HttpContextContract) {
    if (auth.user) {
      const clinicId = auth.user.clinicId;

      const factoryData = await Database.rawQuery(
        'SELECT df.* FROM drug_factories df LEFT JOIN drug_factory_partners dfp ON dfp.drug_factory_id = df.id LEFT JOIN clinics cl ON cl.id = dfp.clinic_id WHERE cl.id = ?',
        [clinicId]
        )
      // console.log(factoryData)

      return response.ok({
        message: "Data fetched!",
        data: factoryData[0],
      });
    }
  }

  public async showFactoryDetails({ params, response }: HttpContextContract) {
    try {
      const factoryId = params.id;

      // const factoryDetails = await Database.rawQuery(
      //   "SELECT * FROM drug_factories WHERE id = ?",
      //   [factoryId]
      // );

      const factoryDetail = await DrugFactory.query()
        .preload("drugs", (tmp) => {
          tmp.preload("drugCategory");
        })
        .preload("purchaseTransactions")
        .where("id", factoryId);

      return response.ok({
        message: "Data fetched!",
        data: factoryDetail[0],
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: "Error fetching factory details" });
    }
  }

  public async updateFactoryDetails({request, response, params, auth}: HttpContextContract) {
    try{
      if(auth.user){
        const data = await request.validate(AddDrugFactoryValidator)
        const id = params.id
        const dataFactory = await Database.rawQuery(
          'SELECT * FROM drug_factories WHERE id = ?',
          [id]
        )
        dataFactory.factoryName = data.factoryName
        dataFactory.factoryEmail = data.factoryEmail;
        dataFactory.factoryPhone = data.factoryPhone;
        
        await dataFactory.save()
        return response.ok({message: "Factory has been updated successfully"})
      }
    } catch (error) {
      console.log(error)
      return response.unprocessableEntity(error.messages.errors);
    }
  }


  public async deleteClinicDrugFactory({
    response,
    params,
    auth,
  }: HttpContextContract) {
    if (auth.user) {
      try {
        const factoryData = await DrugFactory.findOrFail(params.id);

        await factoryData.related("clinics").detach([auth.user.clinicId]);

        return response.ok({ message: "Pabrik berhasil dihapus!" });
      } catch (error) {
        if (error.status === 404) {
          throw new DataNotFoundException("Data tidak ditemukan!", 404);
        }
      }

    }
  }
}
