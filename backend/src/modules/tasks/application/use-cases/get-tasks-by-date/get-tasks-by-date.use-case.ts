// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import { UserDoesntExistError } from './get-tasks-by-date.error'
import { TaskMapper } from '@/modules/tasks/mappers'
import { TaskDate } from '@/modules/tasks/domain'

// Types
import type { GetTasksByDateResponse } from './get-tasks-by-date.response'
import type { UseCase } from '@/shared/core'
import type { TasksRepository } from '@/modules/tasks/repos'
import type { UsersRepository } from '@/modules/users/repos'
import type {
  GetTasksByDateDto,
  GetTasksByDateResponseDto
} from './get-tasks-by-date.dto'

export class GetTasksByDateUseCase
  implements UseCase<GetTasksByDateDto, Promise<GetTasksByDateResponse>>
{
  private usersRepository: UsersRepository
  private tasksRepository: TasksRepository

  constructor(
    usersRepository: UsersRepository,
    tasksRepository: TasksRepository
  ) {
    this.usersRepository = usersRepository
    this.tasksRepository = tasksRepository
  }

  async execute(
    getTasksByDateDto: GetTasksByDateDto
  ): Promise<GetTasksByDateResponse> {
    try {
      const dateOrError = TaskDate.create(getTasksByDateDto.date)

      const dtoResult = Result.combine([dateOrError])

      if (dtoResult.isFailure) {
        return left(
          Result.fail<void>(dtoResult.getError())
        ) as GetTasksByDateResponse
      }

      const date = dateOrError.getValue()

      const user = await this.usersRepository.getUserById(
        getTasksByDateDto.userId
      )

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserDoesntExistError(getTasksByDateDto.userId)
        ) as GetTasksByDateResponse
      }

      const tasks = await this.tasksRepository.getTasksByDate(
        date.value.toString()
      )

      return right(
        Result.ok<GetTasksByDateResponseDto>(tasks.map(TaskMapper.toDto))
      )
    } catch (err) {
      return left(new AppError(err)) as GetTasksByDateResponse
    }
  }
}
