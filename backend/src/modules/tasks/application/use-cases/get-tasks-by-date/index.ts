import { GetTasksByDateController } from './get-tasks-by-date.controller'
import { GetTasksByDateUseCase } from './get-tasks-by-date.use-case'
import { usersRepository } from '@/modules/users/repos'
import { tasksRepository } from '@/modules/tasks/repos'

export const getTasksByDateUseCase = new GetTasksByDateUseCase(
  usersRepository,
  tasksRepository
)
export const getTasksByDateController = new GetTasksByDateController(
  getTasksByDateUseCase
)
