import { Error, Result } from '@/shared/core'

export class UserDoesntExistError extends Result<Error> {
  constructor(id: string) {
    super(false, {
      message: `We could not find any user with this id: ${id}`
    })
  }
}
export class TaskDoesntExistError extends Result<Error> {
  constructor(id: string) {
    super(false, {
      message: `We could not find any task with this id: ${id}`
    })
  }
}
