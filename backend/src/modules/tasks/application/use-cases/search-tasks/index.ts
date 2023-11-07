import { SearchTasksController } from './search-tasks.controller'
import { SearchTasksUseCase } from './search-tasks.use-case'
import { usersRepository } from '@/modules/users/repos'
import { tasksRepository } from '@/modules/tasks/repos'

export const searchTasksUseCase = new SearchTasksUseCase(
  usersRepository,
  tasksRepository
)
export const searchTasksController = new SearchTasksController(
  searchTasksUseCase
)
