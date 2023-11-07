// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import {
  Task,
  TaskDate,
  TaskDescription,
  TaskTitle
} from '@/modules/tasks/domain'
import { UserDoesntExistError } from './update-task.error'

// Types
import type { UpdateTaskDto, UpdateTaskResponseDto } from './update-task.dto'
import type { UpdateTaskResponse } from './update-task.response'
import type { UseCase } from '@/shared/core'
import type { TasksRepository } from '@/modules/tasks/repos'
import type { UsersRepository } from '@/modules/users/repos'
import { TaskMapper } from '@/modules/tasks/mappers'

export class UpdateTaskUseCase
  implements UseCase<UpdateTaskDto, Promise<UpdateTaskResponse>>
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

  async execute(updateTaskDto: UpdateTaskDto): Promise<UpdateTaskResponse> {
    try {
      const titleOrError = TaskTitle.create(updateTaskDto.title)
      const dateOrError = TaskDate.create(updateTaskDto.date)
      const descriptionOrError = TaskDescription.create(
        updateTaskDto.description
      )
      const dtoResult = Result.combine([
        titleOrError,
        descriptionOrError,
        dateOrError
      ])

      if (dtoResult.isFailure) {
        return left(
          Result.fail<void>(dtoResult.getError())
        ) as UpdateTaskResponse
      }

      const title = titleOrError.getValue()
      const description = descriptionOrError.getValue()
      const date = dateOrError.getValue()

      const user = await this.usersRepository.getUserById(updateTaskDto.userId)

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserDoesntExistError(updateTaskDto.userId)
        ) as UpdateTaskResponse
      }

      const taskOrError: Result<Task> = Task.create(
        {
          completed: updateTaskDto.completed,
          userId: updateTaskDto.userId,
          title,
          date,
          description
        },
        updateTaskDto.id
      )

      if (taskOrError.isFailure) {
        return left(
          Result.fail<Task>(taskOrError.getError().toString())
        ) as UpdateTaskResponse
      }

      const task: Task = taskOrError.getValue()

      const updatedTask = await this.tasksRepository.update(task)

      return right(
        Result.ok<UpdateTaskResponseDto>(TaskMapper.toDto(updatedTask as Task))
      )
    } catch (err) {
      return left(new AppError(err)) as UpdateTaskResponse
    }
  }
}
