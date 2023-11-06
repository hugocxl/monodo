// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import { Task, TaskDescription, TaskTitle } from '@/modules/tasks/domain'
import { UserDoesntExistError } from './create-task.error'

// Types
import type { CreateTaskDto, CreateTaskResponseDto } from './create-task.dto'
import type { CreateTaskResponse } from './create-task.response'
import type { UseCase } from '@/shared/core'
import type { TasksRepository } from '@/modules/tasks/repos'
import type { UsersRepository } from '@/modules/users/repos'

export class CreateTaskUseCase
  implements UseCase<CreateTaskDto, Promise<CreateTaskResponse>>
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

  async execute(createTaskDto: CreateTaskDto): Promise<CreateTaskResponse> {
    try {
      const titleOrError = TaskTitle.create(createTaskDto.title)
      const descriptionOrError = TaskDescription.create(
        createTaskDto.description
      )
      const dtoResult = Result.combine([titleOrError, descriptionOrError])

      if (dtoResult.isFailure) {
        return left(
          Result.fail<void>(dtoResult.getError())
        ) as CreateTaskResponse
      }

      const title = titleOrError.getValue()
      const description = descriptionOrError.getValue()

      const user = await this.usersRepository.getUserById(createTaskDto.userId)

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserDoesntExistError(createTaskDto.userId)
        ) as CreateTaskResponse
      }

      const taskOrError: Result<Task> = Task.create({
        userId: createTaskDto.userId,
        title,
        description
      })

      if (taskOrError.isFailure) {
        return left(
          Result.fail<Task>(taskOrError.getError().toString())
        ) as CreateTaskResponse
      }

      const task: Task = taskOrError.getValue()

      await this.tasksRepository.create(task)

      return right(
        Result.ok<CreateTaskResponseDto>({
          title: task.title.value,
          description: task.description.value
        })
      )
    } catch (err) {
      return left(new AppError(err)) as CreateTaskResponse
    }
  }
}
