// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import { EmailAlreadyTakenError } from './sign-up.error'

// Types
import type { Response } from 'express'
import type { SignUpDto, SignUpResponseDto } from './sign-up.dto'
import type { SignUpUseCase } from './sign-up.use-case'
import type { AuthRequest } from '@/shared/infra'

export class SignUpController extends BaseController {
  private useCase: SignUpUseCase

  constructor(useCase: SignUpUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: AuthRequest, res: Response): Promise<any> {
    const dto = req.body as SignUpDto

    try {
      const result = await this.useCase.execute(dto)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case EmailAlreadyTakenError:
            return this.conflict(res, error.getError().message)
          default: {
            const defaultError = error.getError()
            return this.fail(
              res,
              defaultError?.message || defaultError.toString()
            )
          }
        }
      } else {
        const user = result.value.getValue()

        req.session.user = user

        return this.ok<SignUpResponseDto>(res, user)
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
