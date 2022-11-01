import { Middleware, HttpResponse } from '../../presentation/protocols'
import { forbidden, ok, serverError } from '../../presentation/helpers'
import { AccessDeniedError } from '../../presentation/errors'
import { LoadAccountByToken } from '../../domain/usecases'
import { Decrypter } from '../../data/protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly decripter: Decrypter,
    private readonly role?: string
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      if (accessToken) {
        try{
          const accountId = await this.decripter.decrypt(accessToken)
          return ok({ accountId })
        }
        catch{
          return forbidden(new AccessDeniedError())
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
