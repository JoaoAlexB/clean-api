import { DbAddAccount } from '../../../data/usecases'
import { AddAccount } from '../../../domain/usecases'
import { AccountPrismaRepository } from '../../../infra/db'
import { BcryptAdapter } from '../../../infra/cryptography'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountPrismaRepository = new AccountPrismaRepository()
  return new DbAddAccount(bcryptAdapter, accountPrismaRepository, accountPrismaRepository)
}
