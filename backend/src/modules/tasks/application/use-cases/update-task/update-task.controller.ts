// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import { UserDoesntExistError } from './update-task.error'

// Types
import type { Request, Response } from 'express'
import type { UpdateTaskDto, UpdateTaskResponseDto } from './update-task.dto'
import type { UpdateTaskUseCase } from './update-task.use-case'

export class UpdateTaskController extends BaseController {
  private useCase: UpdateTaskUseCase

  constructor(useCase: UpdateTaskUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as UpdateTaskDto

    try {
      const result = await this.useCase.execute(dto)

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case UserDoesntExistError:
            return this.notFound(res, error.getError().message)
          default: {
            const defaultError = error.getError()
            return this.fail(
              res,
              defaultError?.message || defaultError.toString()
            )
          }
        }
      } else {
        return this.ok<UpdateTaskResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
