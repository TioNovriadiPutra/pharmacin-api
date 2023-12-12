import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
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

      return response.created({ message: "Drug factory added!", data: data});
    } catch (error) {
      if (error.status === 422) {
        return response.unprocessableEntity(error.messages.errors);
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
        [auth.user.clinicId]
        )
      // console.log(factoryData)

      // const factoriesData = await DrugFactory.query()
      //   .whereHas("clinics", (builder) => {
      //     builder.where("clinic_id", clinicId);
      //   }).preload('drugs')
      //   .orderBy("factory_name", "asc");

      return response.ok({
        message: "Data fetched!",
        data: factoryData,
      });
    }
  }

  public async showFactoryDetails({ params, response }: HttpContextContract) {
    try {
      const factoryId  = params.id;
      console.log(factoryId)

      const factoryDetails = await Database.rawQuery(
        'SELECT * FROM drug_factories WHERE id = ?',
        [factoryId]
      )
      // const factoryDetails = await DrugFactory.query()
      //   .where('id', factoryId).preload('drugs') //preload drugs
        
      // if (!factoryDetails.length ) {
      //   return response.status(404).json({ message: 'Factory not found' });
      // }

      return response.ok({
        message: 'Factory details fetched!',
        data: factoryDetails,
      });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: 'Error fetching factory details' });
    }
  }
}
