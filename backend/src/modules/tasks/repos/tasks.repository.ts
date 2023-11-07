import type { Task } from '../domain'

export type TasksRepository = {
  getTaskById(id: string): Promise<Task | null>
  getTasksByTitle(title: string): Promise<(Task | null)[]>
  create(user: Task): Promise<void>
}
