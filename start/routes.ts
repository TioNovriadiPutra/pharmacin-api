/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { message: "API Running!" };
});

Route.group(() => {
  Route.post("/register", "AuthController.register").as("auth.register");
  Route.post("/login", "AuthController.login").as("auth.login");
  Route.post("/register/employee/:id", "AuthController.registerEmployee")
    .as("auth.register.employee")
    .middleware(["auth"]);
}).prefix("auth");

Route.group(() => {
  Route.get("/", "UsersController.getUserProfile").as("user.profile");
})
  .prefix("user")
  .middleware("auth");

Route.group(() => {
  Route.get("/report", "ClinicsController.getClinicReport").as("clinic.report");
})
  .prefix("clinic")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "DrugFactoriesController.showClinicDrugFactories").as(
    "factory.show"
  );
  Route.post("/", "DrugFactoriesController.addDrugFactory").as(
    "factory.add-factory"
  );
  Route.get("/:id", "DrugFactoriesController.showFactoryDetails").as(
    "factory.details"
  );
})
  .prefix("factory")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "DrugsController.showDrugs").as("drugs.show");
  Route.post("/", "DrugsController.addDrug").as("drugs.add-drug");
})
  .prefix("drug")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "DrugCategoriesController.showClinicDrugCategories").as(
    "category.show"
  );
  Route.post("/", "DrugCategoriesController.addDrugCategory").as(
    "category.add-drug-category"
  );
})
  .prefix("category")
  .middleware("auth");
