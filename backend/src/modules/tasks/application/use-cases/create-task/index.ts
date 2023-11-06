import { CreateTaskController } from './create-task.controller'
import { CreateTaskUseCase } from './create-task.use-case'
import { usersRepository } from '@/modules/users/repos'
import { tasksRepository } from '@/modules/tasks/repos'

export const createTaskUseCase = new CreateTaskUseCase(
  usersRepository,
  tasksRepository
)
export const createTaskController = new CreateTaskController(createTaskUseCase)
