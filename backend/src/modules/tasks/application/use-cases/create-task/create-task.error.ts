import { Error, Result } from '@/shared/core'

export class UserDoesntExistError extends Result<Error> {
  constructor(id: string) {
    super(false, {
      message: `We could not find any user with this email: ${id}`
    })
  }
}

export class PasswordDoesntMatchError extends Result<Error> {
  constructor() {
    super(false, { message: `Incorrect password` })
  }
}
