import type { TaskDto } from '@/modules/tasks/dto'

export type SearchTasksDto = {
  title: string
  userId: string
}

export type SearchTasksResponseDto = TaskDto[]
