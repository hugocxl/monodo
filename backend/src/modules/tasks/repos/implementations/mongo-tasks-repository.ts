// Dependencies
import { TaskMapper } from '../../mappers'

// Types
import type mongoose from 'mongoose'
import type { Task } from '../../domain'
import type { TasksRepository } from '../tasks.repository'

export class MongoTasksRepository implements TasksRepository {
  private model: mongoose.Model<Task>

  constructor(model: mongoose.Model<Task>) {
    this.model = model
  }

  async getTaskById(id: string) {
    const task = await this.model.find({ id })

    return TaskMapper.toDomain(task[0])
  }

  async create(task: Task) {
    const rawMongoTask = await TaskMapper.toPersistence(task)
    await this.model.create(rawMongoTask)

    return
  }
}
