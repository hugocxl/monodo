import { Error, Result } from '@/shared/core'

export class UserEmailDoesntExistError extends Result<Error> {
  constructor(email: string) {
    super(false, {
      message: `We could not find any user with this email: ${email}`
    })
  }
}

export class PasswordDoesntMatchError extends Result<Error> {
  constructor() {
    super(false, { message: `Incorrect password` })
  }
}
