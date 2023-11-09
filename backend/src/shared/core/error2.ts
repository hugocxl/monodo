import { Result } from './result2'

interface IError {
  message: string
}

export abstract class Error implements IError {
  public readonly message: string

  constructor(message: string) {
    this.message = message
    console.error(`[Error]: An unexpected error occurred`)
    console.error(message)
  }
}

export class AppError extends Result<Error> {
  public constructor(err: unknown) {
    super(false, {
      message: `An unexpected error occurred.`,
      error: err
    } as Error)
    console.log(`[AppError]: An unexpected error occurred`)
    console.error(err)
  }
}
