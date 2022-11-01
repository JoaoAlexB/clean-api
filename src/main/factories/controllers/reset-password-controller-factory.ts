import { makeResetPasswordValidation, makeResetPassword } from '../../../main/factories'
import { makeValidationControllerDecorator } from '../../../main/factories/decorators'
import { ResetPasswordController } from '../../../presentation/controllers/reset-password-controller'
import { Controller } from '../../../presentation/protocols'

export const makeResetPasswordController = (): Controller => {
  const controller = new ResetPasswordController(makeResetPassword())
  const validationControllerDecorator = makeValidationControllerDecorator(controller, makeResetPasswordValidation())
  return validationControllerDecorator;
}
