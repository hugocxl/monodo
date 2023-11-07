import type { TaskDto } from '@/modules/tasks/dto'

export type DeleteTaskDto = {
  userId: string
  id: string
}

export type DeleteTaskResponseDto = TaskDto
