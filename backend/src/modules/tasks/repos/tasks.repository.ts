import type { Task } from '../domain'

export type TasksRepository = {
  getTaskById(id: string): Promise<Task | null>
  getTasksByDate(date: string): Promise<Task[]>
  getTasksByTitle(title: string): Promise<Task[]>
  create(task: Task): Promise<Task | null>
  update(task: Task): Promise<Task | null>
  delete(task: Task): Promise<Task | null>
}
