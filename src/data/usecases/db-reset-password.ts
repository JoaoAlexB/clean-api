import { ResetPassword } from '../../domain/usecases'
import { Hasher, UpdatePasswordRepository } from '../../data/protocols'

export class DbResetPassword implements ResetPassword {
  constructor (
    private readonly hasher: Hasher,
    private readonly updatePasswordRepository: UpdatePasswordRepository
  ) {}

    async reset(resetPasswordParams: ResetPassword.Params):Promise<boolean>{
			const { id, password } = resetPasswordParams
			const hashedPassword = await this.hasher.hash(password)
			this.updatePasswordRepository.updatePassword(id, hashedPassword)
			return true
    }

}
