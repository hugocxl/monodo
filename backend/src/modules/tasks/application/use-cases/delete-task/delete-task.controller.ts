// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import { UserDoesntExistError } from './delete-task.error'

// Types
import type { Request, Response } from 'express'
import type { DeleteTaskDto, DeleteTaskResponseDto } from './delete-task.dto'
import type { DeleteTaskUseCase } from './delete-task.use-case'

export class DeleteTaskController extends BaseController {
  private useCase: DeleteTaskUseCase

  constructor(useCase: DeleteTaskUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as DeleteTaskDto

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
        return this.ok<DeleteTaskResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
