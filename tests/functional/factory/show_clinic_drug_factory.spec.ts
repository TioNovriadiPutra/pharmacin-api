import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { ClinicFactory } from "Database/factories/ClinicFactory";

test.group("Factory show clinic drug factory", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    return () => Database.rollbackGlobalTransaction();
  });

  test("should response status code 401 when token not provided", async ({
    client,
  }) => {
    const response = await client.get("/factory");

    response.assertStatus(401);
  });

  test("should response with error message when token not provided", async ({
    client,
  }) => {
    const response = await client.get("/factory");

    response.assertBodyContains({
      errors: [{ message: "E_UNAUTHORIZED_ACCESS: Unauthorized access" }],
    });
  });

  test("should response status code 200 when drug factories data fetched", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1)
      .with("drugFactories", 10)
      .create();

    const response = await client
      .get("/factory")
      .loginAs(newClinic.employees[0]);

    response.assertStatus(200);
  });
});
