import { CreateTaskController } from './create-task.controller'
import { CreateTaskUseCase } from './create-task.use-case'
import { tasksRepository } from '@/modules/tasks/repos'

export const createTaskUseCase = new CreateTaskUseCase(tasksRepository)
export const createTaskController = new CreateTaskController(createTaskUseCase)
