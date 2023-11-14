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
