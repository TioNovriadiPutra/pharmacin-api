import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { ValidationException } from "@ioc:Adonis/Core/Validator";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new CustomValidationException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class CustomValidationException extends ValidationException {
  constructor(flashToSession: boolean, messages?: any) {
    super(flashToSession, messages);
  }

  handle(error: any, ctx: HttpContextContract) {
    return ctx.response.unprocessableEntity({
      error: {
        message: error.messages.errors,
        code: error.status,
      },
    });
  }
}
