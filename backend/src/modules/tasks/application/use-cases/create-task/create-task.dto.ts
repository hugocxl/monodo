import type { TaskDto } from '@/modules/tasks/dto'

export type CreateTaskDto = {
  title: string
  description: string
  userId: string
  date: string
}

export type CreateTaskResponseDto = TaskDto
