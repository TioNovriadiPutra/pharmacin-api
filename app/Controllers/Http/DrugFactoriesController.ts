import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import CustomValidationException from "App/Exceptions/CustomValidationException";
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
      // const factoryData = await Database.rawQuery(
      //   "SELECT df.* FROM drug_factories df LEFT JOIN drug_factory_partners dfp ON dfp.drug_factory_id = df.id LEFT JOIN clinics cl ON cl.id = dfp.clinic_id WHERE cl.id = ?",
      //   [auth.user.clinicId]
      // );
      // console.log(factoryData)

      const factoryData = await Clinic.query()
        .preload("drugFactories")
        .where("id", auth.user.clinicId);

      return response.ok({
        message: "Data fetched!",
        data: factoryData,
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
        data: factoryDetail,
      });
    } catch (error) {
      console.error(error);
      return response
        .status(500)
        .json({ message: "Error fetching factory details" });
    }
  }
}
