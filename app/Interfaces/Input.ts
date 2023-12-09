import { Gender } from "App/Enums/Gender";

export interface UserInput {
  email?: string;
  password?: string;
  password_confirmation?: string;
  fullName?: string;
  gender?: Gender;
  phone?: string;
  clinicName?: string;
  clinicPhone?: string;
}

export interface LoginInput {
  email?: string;
  password?: string;
}

export interface EmployeeInput {
  email?: string;
  password?: string;
  password_confirmation?: string;
  fullName?: string;
  gender?: Gender;
  phone?: string;
}

export interface FactoryInput {
  factoryName?: string;
  factoryEmail?: string;
  factoryPhone?: string;
}

export interface DrugInput {
  name?: string;
  sellingPrice?: number;
  purchasePrice?: number;
}