import type { TasksRepository } from '../../src/modules/tasks/repos'
import { TaskMapper } from '../../src/modules/tasks/mappers'
import { Task } from '../../src/modules/tasks/domain'

const mockedTask = {
  _id: {
    toString: () => '123'
  },
  title: 'mock task',
  userId: '123',
  date: '10-10-1990',
  completed: true
}

export class TasksRepositoryMock implements TasksRepository {
  async getTaskById() {
    await Promise.resolve(null)

    return TaskMapper.toDomain(mockedTask)
  }

  async getTasksByDate() {
    await Promise.resolve(null)

    return [TaskMapper.toDomain(mockedTask) as Task]
  }

  async getTasksByTitle() {
    await Promise.resolve(null)

    return [TaskMapper.toDomain(mockedTask) as Task]
  }

  async create(task: Task) {
    const rawTask = await TaskMapper.toPersistence(task)

    return TaskMapper.toDomain(rawTask)
  }

  async update(task: Task) {
    const rawTask = await TaskMapper.toPersistence(task)

    return TaskMapper.toDomain(rawTask)
  }

  async delete(task: Task) {
    const rawTask = await TaskMapper.toPersistence(task)

    return TaskMapper.toDomain(rawTask)
  }
}
