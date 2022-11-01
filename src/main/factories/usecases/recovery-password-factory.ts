import { AccountPrismaRepository } from '../../../infra/db'
import { JwtAdapter } from '../../../infra/cryptography'
import { EmailRecoveryPassword } from '../../../data/usecases/email-recovery-password'
import { NodemailerAdapter } from '../../../infra/email/nodemailer-adapter'
import { RecoveryPassword } from '../../../domain/usecases'

export const makeRecoveryPassword = (): RecoveryPassword => {
  const emailSender = new NodemailerAdapter()
  const userRepository = new AccountPrismaRepository()
  const encrypter = new JwtAdapter(process.env.JWT_SECRET || "")
  return new EmailRecoveryPassword(emailSender, userRepository, encrypter)
}
