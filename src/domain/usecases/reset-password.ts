export interface ResetPassword {
  reset: (resetPasswordParams: ResetPassword.Params) => Promise<boolean>
}

export namespace ResetPassword {
  export type Params = {
    id: string,
    password: string
  }
}
