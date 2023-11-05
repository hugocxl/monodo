// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import {
  PasswordDoesntMatchError,
  UserEmailDoesntExistError
} from './sign-in.error'

// Types
import type { Request, Response } from 'express'
import type { SignInDto, SignInResponseDto } from './sign-in.dto'
import type { SignInUseCase } from './sign-in.use-case'

export class SignInController extends BaseController {
  private useCase: SignInUseCase

  constructor(useCase: SignInUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as SignInDto

    try {
      const result = await this.useCase.execute(dto)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case UserEmailDoesntExistError:
            return this.notFound(res, error.getError().message)
          case PasswordDoesntMatchError:
            return this.clientError(res, error.getError().message)
          default: {
            const defaultError = error.getError()
            return this.fail(
              res,
              defaultError?.message || defaultError.toString()
            )
          }
        }
      } else {
        return this.ok<SignInResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
