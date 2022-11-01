import { Controller, HttpResponse } from '../protocols'
import { unauthorized, ok } from '../helpers'
import { RecoveryPassword } from '../../domain/usecases'

export class RecoveryController implements Controller {
  constructor (
    private readonly recoveryPassword: RecoveryPassword
  ) {}

  async handle (request: RecoveryController.Request): Promise<HttpResponse> {
    const { email } = request
    const result = await this.recoveryPassword.send({
      email,
    })
    if (!result) {
      return unauthorized()
    }
    return ok(result)
  }
}

export namespace RecoveryController {
  export type Request = {
    email: string
  }
}
