import type { Task } from '../domain'

export type TasksRepository = {
  getTaskById(id: string): Promise<Task | null>
  getTasksByTitle(title: string): Promise<Task[]>
  create(task: Task): Promise<Task | null>
  update(task: Task): Promise<Task | null>
}
