import { makeRecoveryPassword, makeRecoveryValidation } from '../../../main/factories'
import { makeValidationControllerDecorator } from '../../../main/factories/decorators'
import { Controller } from '../../../presentation/protocols'
import { RecoveryController } from '../../../presentation/controllers'

export const makeRecoveryController = (): Controller => {
  const controller = new RecoveryController(makeRecoveryPassword())
  const validationControllerDecorator = makeValidationControllerDecorator(controller, makeRecoveryValidation())
  return validationControllerDecorator;
}
