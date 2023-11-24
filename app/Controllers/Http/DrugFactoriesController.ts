import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
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

      const factoriesData = await DrugFactory.query()
        .whereHas("clinics", (builder) => {
          builder.where("clinic_id", clinicId);
        })
        .orderBy("factory_name", "asc");

      return response.ok({
        message: "Data fetched!",
        data: factoriesData,
      });
    }
  }
}
