// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import { UserDoesntExistError } from './get-tasks-by-date.error'

// Types
import type { Request, Response } from 'express'
import type {
  GetTasksByDateDto,
  GetTasksByDateResponseDto
} from './get-tasks-by-date.dto'
import type { GetTasksByDateUseCase } from './get-tasks-by-date.use-case'

export class GetTasksByDateController extends BaseController {
  private useCase: GetTasksByDateUseCase

  constructor(useCase: GetTasksByDateUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as GetTasksByDateDto

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
        return this.ok<GetTasksByDateResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
