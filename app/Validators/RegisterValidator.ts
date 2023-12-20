import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class RegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string([ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string([
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    email: schema.string([
      rules.email({
        ignoreMaxLength: true,
      }),
      rules.unique({
        table: "users",
        column: "email",
      }),
    ]),
    password: schema.string([rules.minLength(8), rules.confirmed()]),
    fullName: schema.string([
      rules.alpha({
        allow: ["space"],
      }),
    ]),
    gender: schema.object().members({
      label: schema.string(),
      value: schema.enum(["male", "female"] as const),
    }),
    phone: schema.string([
      rules.mobile({
        locale: ["id-ID"],
      }),
    ]),
    clinicName: schema.string(),
    clinicPhone: schema.string([
      rules.mobile({
        locale: ["id-ID"],
      }),
    ]),
  });

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    "email.required": "Email harus diisi!",
    "email.email": "Format Email salah!",
    "email.unique": "Email sudah terdaftar!",
    "password.required": "Password harus diisi!",
    "password.minLength": "Password minimal 8 karakter!",
    "password_confirmation.confirmed": "Konfirmasi Password gagal!",
    "fullName.required": "Nama Lengkap harus diisi!",
    "fullName.alpha": "Nama Lengkap harus terdiri dari alfabet saja!",
    "gender.required": "Jenis Kelamin harus diisi!",
    "phone.required": "Nomor Handphone harus diisi!",
    "phone.mobile": "Nomor Handphone bukan nomor Indonesia!",
    "clinicName.required": "Nama Klinik harus diisi!",
    "clinicPhone.required": "Nomor Telepon Klinik harus diisi!",
    "clinicPhone.mobile": "Nomor Telepon Klinik salah!",
  };
}
