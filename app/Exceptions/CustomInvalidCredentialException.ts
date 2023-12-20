import { InvalidCredentialsException } from "@adonisjs/auth/build/src/Exceptions/InvalidCredentialsException";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new CustomInvalidCredentialException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class CustomInvalidCredentialException extends InvalidCredentialsException {
  handle(
    error: InvalidCredentialsException,
    ctx: HttpContextContract
  ): Promise<void> {
    ctx.response.unauthorized({
      error: {
        message: error.message,
        code: 401,
      },
    });

    return Promise.resolve();
  }
}
