import { UpdateTaskController } from './update-task.controller'
import { UpdateTaskUseCase } from './update-task.use-case'
import { usersRepository } from '@/modules/users/repos'
import { tasksRepository } from '@/modules/tasks/repos'

export const updateTaskUseCase = new UpdateTaskUseCase(
  usersRepository,
  tasksRepository
)
export const updateTaskController = new UpdateTaskController(updateTaskUseCase)
