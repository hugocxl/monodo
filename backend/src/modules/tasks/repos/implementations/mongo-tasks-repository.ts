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

  async getTasksByTitle(titleQuery: string) {
    const expression = `.*${titleQuery}.*`
    const regexp = new RegExp(expression, 'g')

    const tasks = await this.model
      .find({
        title: regexp
      })
      .exec()

    if (!tasks) return []

    return tasks.map(TaskMapper.toDomain)
  }

  async create(task: Task) {
    const rawMongoTask = await TaskMapper.toPersistence(task)
    await this.model.create(rawMongoTask)

    return
  }
}
