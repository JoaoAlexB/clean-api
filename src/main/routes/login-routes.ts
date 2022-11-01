import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoginController, makeSignUpController, makeRecoveryController, makeResetPasswordController } from '../factories'
import { auth } from '../../main/middlewares'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/recovery', adaptRoute(makeRecoveryController()))
  router.post('/reset-password', auth, adaptRoute(makeResetPasswordController()))
}
