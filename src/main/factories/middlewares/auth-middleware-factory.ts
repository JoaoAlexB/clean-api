import { Middleware } from '../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/middlewares'
import { JwtAdapter } from '../../../infra/cryptography'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(new JwtAdapter(process.env.JWT_SECRET || ""), role)
}
