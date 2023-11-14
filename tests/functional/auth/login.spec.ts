import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { LoginInput } from "App/Interfaces/Input";
import { ClinicFactory } from "Database/factories/ClinicFactory";

test.group("Auth login", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    return () => Database.rollbackGlobalTransaction();
  });

  test("should response status code 400 when user not provide full credential", async ({
    client,
  }) => {
    const response = await client.post("/auth/login");

    response.assertStatus(400);
  });

  test("should response error message when user not provide full credential", async ({
    client,
  }) => {
    const response = await client.post("/auth/login");

    response.assertBodyContains({
      message: "Email and Password must be filled!",
    });
  });

  test("should response status code 401 when user provide wrong credential", async ({
    client,
  }) => {
    const loginInput: LoginInput = {
      email: "test@gmail.com",
      password: "secretpassword",
    };

    const response = await client.post("/auth/login").form(loginInput);

    response.assertStatus(401);
  });

  test("should response with error message when user provide wrong credential", async ({
    client,
  }) => {
    const loginInput: LoginInput = {
      email: "test@gmail.com",
      password: "secretpassword",
    };

    const response = await client.post("/auth/login").form(loginInput);

    response.assertBodyContains({
      message: "Email or Password incorrect!",
    });
  });

  test("should response status code 200 when login success", async ({
    client,
  }) => {
    const newUser = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin").apply("login")
    ).create();

    const loginInput: LoginInput = {
      email: newUser.employees[0].email,
      password: "secretpassword",
    };

    const response = await client.post("/auth/login").form(loginInput);

    response.assertStatus(200);
  });

  test("should response with message and token when login success", async ({
    client,
    assert,
  }) => {
    const newUser = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin").apply("login")
    ).create();

    const loginInput: LoginInput = {
      email: newUser.employees[0].email,
      password: "secretpassword",
    };

    const response = await client.post("/auth/login").form(loginInput);

    response.assertBodyContains({
      message: "Login success!",
    });

    assert.exists(response.body().token);
  });
});
