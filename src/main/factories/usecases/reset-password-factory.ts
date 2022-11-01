import { AccountPrismaRepository } from '../../../infra/db'
import { BcryptAdapter } from '../../../infra/cryptography'
import { DbResetPassword } from '../../../data/usecases'
import { ResetPassword } from '../../../domain/usecases'

export const makeResetPassword = (): ResetPassword => {
  const salt = 12
  const userRepository = new AccountPrismaRepository()
  const hasher = new BcryptAdapter(salt)
  return new DbResetPassword(hasher, userRepository)
}
