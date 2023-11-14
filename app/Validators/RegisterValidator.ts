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
    gender: schema.enum(["male", "female"] as const),
    phone: schema.string([
      rules.mobile({
        locale: ["id-ID"],
      }),
    ]),
    clinicName: schema.string(),
    clinicPhone: schema.string.optional([
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
    "email.required": "Email must be filled!",
    "email.email": "Email format incorrect!",
    "email.unique": "Email already registered!",
    "password.required": "Password must be filled!",
    "password.minLength": "Password at least 8 characters!",
    "password_confirmation.confirmed": "Password confirmation failed!",
    "fullName.required": "Full name must be filled!",
    "fullName.alpha": "Full name must contain alphabet only!",
    "gender.required": "Gender must be filled!",
    "phone.required": "Phone number must be filled!",
    "phone.mobile": "Phone number format incorrect!",
    "clinicName.requied": "Clinic name must be filled!",
    "clinicPhone.mobile": "Clinic phone number format incorrect!",
  };
}
