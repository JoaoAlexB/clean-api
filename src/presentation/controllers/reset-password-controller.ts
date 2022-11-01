import { Controller, HttpResponse } from '../protocols'
import { unauthorized, ok } from '../helpers'
import { ResetPassword } from '../../domain/usecases'

export class ResetPasswordController implements Controller {
  constructor (
    private readonly resetPassword: ResetPassword
  ) {}

  async handle (request: ResetPasswordController.Request): Promise<HttpResponse> {
    const { accountId, password } = request
    const result = await this.resetPassword.reset({
      id: accountId,
      password,
    })
    if (!result) {
      return unauthorized()
    }
    return ok(result)
  }
}

export namespace ResetPasswordController {
  export type Request = {
    accountId: string,
    password: string
  }
}
