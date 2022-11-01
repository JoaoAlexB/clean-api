export interface RecoveryPassword {
  send: (authenticationParams: RecoveryPassword.Params) => Promise<boolean>
}

export namespace RecoveryPassword {
  export type Params = {
    email: string
  }
}
