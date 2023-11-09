import type { TaskDto } from '@/modules/tasks/dto'

export type CreateTaskDto = {
  title: string
  userId: string
  date: string
}

export type CreateTaskResponseDto = TaskDto
