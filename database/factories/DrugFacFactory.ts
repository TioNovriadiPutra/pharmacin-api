import Factory from "@ioc:Adonis/Lucid/Factory";
import DrugFactory from "App/Models/DrugFactory";

export const DrugFacFactory = Factory.define(DrugFactory, ({ faker }) => {
  return {
    factoryName: faker.company.name(),
    factoryEmail: faker.internet.email(),
    factoryPhone: faker.phone.number(),
  };
}).build();
