import { taskModel } from '../../../shared/infra/database'
import { MongoTasksRepository } from './implementations/mongo-tasks-repository'

export const tasksRepository = new MongoTasksRepository(taskModel)

export * from './tasks.repository'
