import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { Gender } from "App/Enums/Gender";
import { Role } from "App/Enums/Role";
import { UserInput } from "App/Interfaces/Input";
import User from "App/Models/User";

test.group("Auth register", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    return () => Database.rollbackGlobalTransaction();
  });

  test("should response status code 400 when user not provide all the input", async ({
    client,
  }) => {
    const response = await client.post("/auth/register");

    response.assertStatus(400);
  });

  test("should response error messages for every error input", async ({
    client,
  }) => {
    const response = await client.post("/auth/register");

    response.assertBodyContains([
      {
        rule: "required",
        field: "email",
        message: "Email must be filled!",
      },
    ]);
  });

  test("should response status code 201 when admin registration success", async ({
    client,
  }) => {
    const userInput: UserInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
      clinicName: "Test Clinic Name",
    };

    const response = await client.post("/auth/register").form(userInput);

    response.assertStatus(201);
  });

  test("should response success message when admin registration success", async ({
    client,
  }) => {
    const userInput: UserInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
      clinicName: "Test Clinic Name",
    };

    const response = await client.post("/auth/register").form(userInput);

    response.assertBodyContains({
      message: "Registration success!",
    });
  });

  test("should create an admin account", async ({ client, assert }) => {
    const userInput: UserInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
      clinicName: "Test Clinic Name",
    };

    await client.post("/auth/register").form(userInput);

    const userData = await User.findByOrFail("email", "test@gmail.com");

    assert.equal(userData.roleId, Role.ADMIN);
  });
});
