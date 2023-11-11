import type { Task } from '../domain'

export type TasksRepository = {
  getTaskById(id: string, userId: string): Promise<Task | null>
  getTasksByDate(date: string, userdId: string): Promise<Task[]>
  getTasksByTitle(title: string, userdId: string): Promise<Task[]>
  create(task: Task): Promise<Task | null>
  update(task: Task, userId: string): Promise<Task | null>
  delete(task: Task, userId: string): Promise<Task | null>
}
