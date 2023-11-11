// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import { Task } from '@/modules/tasks/domain'
import { TaskDoesntExistError, UserDoesntExistError } from './delete-task.error'
import { TaskMapper } from '@/modules/tasks/mappers'

// Types
import type { DeleteTaskDto, DeleteTaskResponseDto } from './delete-task.dto'
import type { DeleteTaskResponse } from './delete-task.response'
import type { UseCase } from '@/shared/core'
import type { TasksRepository } from '@/modules/tasks/repos'
import type { UsersRepository } from '@/modules/users/repos'

export class DeleteTaskUseCase
  implements UseCase<DeleteTaskDto, Promise<DeleteTaskResponse>>
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

  async execute(deleteTaskDto: DeleteTaskDto): Promise<DeleteTaskResponse> {
    try {
      const user = await this.usersRepository.getUserById(deleteTaskDto.userId)

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserDoesntExistError(deleteTaskDto.userId)
        ) as DeleteTaskResponse
      }

      const task = await this.tasksRepository.getTaskById(
        deleteTaskDto.id,
        deleteTaskDto.userId
      )

      const taskFound = !!task

      if (!taskFound) {
        return left(
          new TaskDoesntExistError(deleteTaskDto.id)
        ) as DeleteTaskResponse
      }

      const deletedTask = await this.tasksRepository.delete(task, task.userId)

      return right(
        Result.ok<DeleteTaskResponseDto>(TaskMapper.toDto(deletedTask as Task))
      )
    } catch (err) {
      return left(new AppError(err)) as DeleteTaskResponse
    }
  }
}
