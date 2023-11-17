import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import DrugFactory from "App/Models/DrugFactory";
import AddDrugFactoryValidator from "App/Validators/AddDrugFactoryValidator";

export default class DrugFactoriesController {
  public async addDrugFactory({
    request,
    response,
    params,
  }: HttpContextContract) {
    try {
      const data = await request.validate(AddDrugFactoryValidator);

      const newDrugFactory = new DrugFactory();
      newDrugFactory.factoryName = data.factoryName;
      newDrugFactory.factoryEmail = data.factoryEmail;
      newDrugFactory.factoryPhone = data.factoryPhone;

      await newDrugFactory.save();

      await newDrugFactory.related("clinics").sync([params.id]);

      return response.created({ message: "Drug factory added!" });
    } catch (error) {
      if (error.status === 422) {
        return response.unprocessableEntity(error.messages.errors);
      }
    }
  }
}
