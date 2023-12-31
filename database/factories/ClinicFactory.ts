import Clinic from "App/Models/Clinic";
import Factory from "@ioc:Adonis/Lucid/Factory";
import { UserFactory } from "./UserFactory";
import { DrugFacFactory } from "./DrugFacFactory";

export const ClinicFactory = Factory.define(Clinic, ({ faker }) => {
  return {
    clinicName: faker.company.name(),
    clinicPhone: faker.phone.number(),
  };
})
  .relation("employees", () => UserFactory)
  .relation("drugFactories", () => DrugFacFactory)
  .build();
