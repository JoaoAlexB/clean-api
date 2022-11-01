import { LoadAccountByToken } from '../../../domain/usecases'
import { DbLoadAccountByToken } from '../../../data/usecases'
import { AccountPrismaRepository } from '../../../infra/db'
import { JwtAdapter } from '../../../infra/cryptography'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.JWT_SECRET || "")
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository)
}
