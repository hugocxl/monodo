import type { TaskDto } from '@/modules/tasks/dto'

export type GetTasksByDateDto = {
  date: string
  userId: string
}

export type GetTasksByDateResponseDto = TaskDto[]
