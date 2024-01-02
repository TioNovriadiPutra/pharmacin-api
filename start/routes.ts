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
  )
  Route.put('/:id', "DrugFactoriesController.updateFactoryDetails").as(
    "factory.update-factory"
  )

  Route.delete("/:id", "DrugFactoriesController.deleteClinicDrugFactory").as(
    "factory.delete"
  );

})
  .prefix("factory")
  .middleware("auth");

Route.group(() => {
  Route.get("/", "DrugsController.showDrugs").as("drugs.show");
  Route.get("/category", "DrugsController.showClinicDrugCategories").as(
    "drug.show.category"
  );
  Route.post("/", "DrugsController.addDrug").as(
    "drugs.add-drug"
  )
  Route.put('/:id', "DrugsController.updateDrug").as(
    "drugs.update-drug"
  )
  Route.delete('/:id', "DrugsController.deleteDrug").as(
    "drugs.delete-drug"
  )
}).prefix("drug").middleware("auth")

Route.group(() => {
  Route.post("/", "DrugCategoriesController.addDrugCategory").as(
    "category.add-drug-category"
  );
})
  .prefix("category")
  .middleware("auth");

// Stock
Route.group(() => {
  Route.get("/", "StocksController.showStockByItem").as("stock.index")
  Route.get("/batch", "StocksController.showStockByBatch").as("stock.batch")
}).prefix("stock").middleware("auth")

Route.resource("payment-method", "PaymentMethodsController")
  .apiOnly()
  .middleware({ "*": ["auth"] });

// Route.resource("subscription", "SubscriptionsController")
//   .apiOnly()
//   .middleware({ "*": ["auth"] });

Route.group(() => {
  Route.get("/", "SubscriptionsController.listSubscription").as("subscription.list")
  Route.post("/", "SubscriptionsController.subscribe").as("subscription.subscribe")
}).prefix("subscription").middleware("auth")