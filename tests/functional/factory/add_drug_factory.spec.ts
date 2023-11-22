import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { FactoryInput } from "App/Interfaces/Input";
import { ClinicFactory } from "Database/factories/ClinicFactory";

test.group("Factory add drug factory", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    return () => Database.rollbackGlobalTransaction();
  });

  test("should response status code 401 when token not provided", async ({
    client,
  }) => {
    const response = await client.post(`/factory`);

    response.assertStatus(401);
  });

  test("should response with error message when token not provided", async ({
    client,
  }) => {
    const response = await client.post(`/factory`);

    response.assertBodyContains({
      errors: [{ message: "E_UNAUTHORIZED_ACCESS: Unauthorized access" }],
    });
  });

  test("should response status code when factory data not fully provided", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees").create();

    const response = await client
      .post(`/factory`)
      .loginAs(newClinic.employees[0]);

    response.assertStatus(422);
  });

  test("should response with error message when factory data not fully provided", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees").create();

    const response = await client
      .post(`/factory`)
      .loginAs(newClinic.employees[0]);

    response.assertBodyContains([
      {
        rule: "required",
        field: "factoryName",
        message: "Factory name must be filled!",
      },
    ]);
  });

  test("should response status code 201 when adding factory is success", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees").create();

    const factoryInput: FactoryInput = {
      factoryName: "Test Factory Name",
    };

    const response = await client
      .post(`/factory`)
      .loginAs(newClinic.employees[0])
      .form(factoryInput);

    response.assertStatus(201);
  });

  test("should response with success message when adding factory is success", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees").create();

    const factoryInput: FactoryInput = {
      factoryName: "Test Factory Name",
    };

    const response = await client
      .post(`/factory`)
      .loginAs(newClinic.employees[0])
      .form(factoryInput);

    response.assertBodyContains({
      message: "Drug factory added!",
    });
  });
});
