import Database from "@ioc:Adonis/Lucid/Database";
import { test } from "@japa/runner";
import { Gender } from "App/Enums/Gender";
import { Role } from "App/Enums/Role";
import { EmployeeInput } from "App/Interfaces/Input";
import User from "App/Models/User";
import { ClinicFactory } from "Database/factories/ClinicFactory";

test.group("Auth register employee", (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction();

    return () => Database.rollbackGlobalTransaction();
  });

  test("should response status code 401 token not provided", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.create();

    const response = await client.post(
      `/auth/register/employee/${newClinic.id}`
    );

    response.assertStatus(401);
  });

  test("should response with error message when token not provided", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.create();

    const response = await client.post(
      `/auth/register/employee/${newClinic.id}`
    );

    response.assertBodyContains({
      errors: [{ message: "E_UNAUTHORIZED_ACCESS: Unauthorized access" }],
    });
  });

  test("should response status code 422 when user not provide all the input", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin")
    ).create();

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0]);

    response.assertStatus(422);
  });

  test("should response status code 422 when user not provide all the input", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin")
    ).create();

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0]);

    response.assertBodyContains([
      {
        rule: "required",
        field: "email",
        message: "Email must be filled!",
      },
    ]);
  });

  test("should response status code when employee registration not from an admin account", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("user")
    ).create();

    const employeeInput: EmployeeInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
    };

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0])
      .form(employeeInput);

    response.assertStatus(403);
  });

  test("should response with error message when employee registration not from an admin account", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("user")
    ).create();

    const employeeInput: EmployeeInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
    };

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0])
      .form(employeeInput);

    response.assertBodyContains({
      message: "Account don't have access!",
    });
  });

  test("should response status code 201 when employee registration success", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin")
    ).create();

    const employeeInput: EmployeeInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
    };

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0])
      .form(employeeInput);

    response.assertStatus(201);
  });

  test("should response with success message when employee registration success", async ({
    client,
  }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin")
    ).create();

    const employeeInput: EmployeeInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
    };

    const response = await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0])
      .form(employeeInput);

    response.assertBodyContains({
      message: "Employee added!",
    });
  });

  test("should create a user account", async ({ client, assert }) => {
    const newClinic = await ClinicFactory.with("employees", 1, (user) =>
      user.apply("admin")
    ).create();

    const employeeInput: EmployeeInput = {
      email: "test@gmail.com",
      password: "secretpassword",
      password_confirmation: "secretpassword",
      fullName: "Test Full Name",
      gender: "male" as Gender,
      phone: "081234567989",
    };

    await client
      .post(`/auth/register/employee/${newClinic.id}`)
      .loginAs(newClinic.employees[0])
      .form(employeeInput);

    const userData = await User.findByOrFail("email", employeeInput.email);

    assert.equal(userData.roleId, Role.USER);
  });
});
