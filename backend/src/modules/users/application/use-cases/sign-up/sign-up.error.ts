import { Error, Result } from '@/shared/core'

export class EmailAlreadyTakenError extends Result<Error> {
  constructor(email: string) {
    super(false, {
      message: `The email ${email} associated for this account already exists`
    })
  }
}
