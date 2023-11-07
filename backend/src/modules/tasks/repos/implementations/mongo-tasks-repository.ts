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
    const task = await this.model.findOne({ id })

    if (task) return TaskMapper.toDomain(task)

    return null
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

    return tasks
      .filter(task => Boolean(task))
      .map(TaskMapper.toDomain) as Task[]
  }

  async create(task: Task) {
    const rawTask = await TaskMapper.toPersistence(task)
    const dbResponse = await this.model.create(rawTask)

    return TaskMapper.toDomain(dbResponse) as Task
  }
  async update(task: Task) {
    const rawTask = await TaskMapper.toPersistence(task)
    const dbResponse = await this.model.findByIdAndUpdate(task.id, rawTask)

    return TaskMapper.toDomain(dbResponse) as Task
  }
}
