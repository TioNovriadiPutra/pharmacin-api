import User from "App/Models/User";
import Factory from "@ioc:Adonis/Lucid/Factory";
import { Role } from "App/Enums/Role";

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    roleId: faker.number.int({ min: 1, max: 2 }),
  };
})
  .state("admin", (user) => {
    user.roleId = Role.ADMIN;
  })
  .state("login", (user) => {
    user.password = "secretpassword";
  })
  .build();
