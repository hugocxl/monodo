import { DeleteTaskController } from './delete-task.controller'
import { DeleteTaskUseCase } from './delete-task.use-case'
import { usersRepository } from '@/modules/users/repos'
import { tasksRepository } from '@/modules/tasks/repos'

export const deleteTaskUseCase = new DeleteTaskUseCase(
  usersRepository,
  tasksRepository
)
export const deleteTaskController = new DeleteTaskController(deleteTaskUseCase)
