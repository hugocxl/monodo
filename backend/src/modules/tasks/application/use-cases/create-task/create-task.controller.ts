// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import {
  PasswordDoesntMatchError,
  UserEmailDoesntExistError
} from './create-task.error'

// Types
import type { Request, Response } from 'express'
import type { CreateTaskDto, CreateTaskResponseDto } from './create-task.dto'
import type { CreateTaskUseCase } from './create-task.use-case'

export class CreateTaskController extends BaseController {
  private useCase: CreateTaskUseCase

  constructor(useCase: CreateTaskUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as CreateTaskDto

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
        return this.ok<CreateTaskResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
