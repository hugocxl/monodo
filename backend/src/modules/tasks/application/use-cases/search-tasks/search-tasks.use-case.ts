// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import { TaskMapper } from '@/modules/tasks/mappers'
import { TaskTitle } from '@/modules/tasks/domain'
import { UserDoesntExistError } from './search-tasks.error'

// Types
import type { SearchTasksDto, SearchTasksResponseDto } from './search-tasks.dto'
import type { SearchTasksResponse } from './search-tasks.response'
import type { UseCase } from '@/shared/core'
import type { TasksRepository } from '@/modules/tasks/repos'
import type { UsersRepository } from '@/modules/users/repos'

export class SearchTasksUseCase
  implements UseCase<SearchTasksDto, Promise<SearchTasksResponse>>
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

  async execute(createTaskDto: SearchTasksDto): Promise<SearchTasksResponse> {
    try {
      const titleOrError = TaskTitle.create(createTaskDto.title)

      if (titleOrError.isFailure) {
        return left(
          Result.fail<void>(titleOrError.getError().value)
        ) as SearchTasksResponse
      }

      const title = titleOrError.getValue()

      const user = await this.usersRepository.getUserById(createTaskDto.userId)

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserDoesntExistError(createTaskDto.userId)
        ) as SearchTasksResponse
      }

      const tasks = await this.tasksRepository.getTasksByTitle(
        title.value,
        createTaskDto.userId
      )

      const tasksDto = tasks.map(task => TaskMapper.toDto(task))

      return right(Result.ok<SearchTasksResponseDto>(tasksDto))
    } catch (err) {
      return left(new AppError(err)) as SearchTasksResponse
    }
  }
}
