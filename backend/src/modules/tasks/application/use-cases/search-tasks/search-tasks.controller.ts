// Dependencies
import { BaseController } from '@/shared/infra/http/models'
import { UserDoesntExistError } from './search-tasks.error'

// Types
import type { Request, Response } from 'express'
import type { SearchTasksDto, SearchTasksResponseDto } from './search-tasks.dto'
import type { SearchTasksUseCase } from './search-tasks.use-case'

export class SearchTasksController extends BaseController {
  private useCase: SearchTasksUseCase

  constructor(useCase: SearchTasksUseCase) {
    super()
    this.useCase = useCase
  }

  async executeImpl(req: Request, res: Response): Promise<any> {
    const dto = req.body as SearchTasksDto

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
        return this.ok<SearchTasksResponseDto>(res, result.value.getValue())
      }
    } catch (err) {
      return this.fail(res, err as Error)
    }
  }
}
