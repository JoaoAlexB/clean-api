import { RecoveryPassword } from '../../domain/usecases'
import { Encrypter, LoadAccountByEmailRepository, EmailSender } from '../protocols'

export class EmailRecoveryPassword implements RecoveryPassword {
  constructor (
    private readonly emailSender: EmailSender,
    private readonly userRepository: LoadAccountByEmailRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async send(recoveryParams: RecoveryPassword.Params): Promise<boolean>{
    const user = await this.userRepository.loadByEmail(recoveryParams.email)
    if(user){
      const token = await this.encrypter.encrypt(user!.id!, '30m')
      const link = `${process.env.RECOVERY_PASSWORD_REDIRECT}${token}`
      const emailText = `Olá, ${user.name}. O link para recuperar sua senha é: '${link}`
      await this.emailSender.send(recoveryParams.email, 'Recuperação de Senha', emailText)
    }
    return true
  }

  
}
