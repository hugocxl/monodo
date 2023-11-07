import type { TaskDto } from '@/modules/tasks/dto'

export type UpdateTaskDto = {
  title: string
  description: string
  completed: boolean
  userId: string
  date: string
  id: string
}

export type UpdateTaskResponseDto = TaskDto
