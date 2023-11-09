import type { TaskDto, UserDto } from '@/shared/types'

export type SignUpDto = {
  email: string
  password: string
}

export type SignInDto = {
  email: string
  password: string
}

export type SignUpResponseDto = UserDto

export type SignInResponseDto = UserDto

export type DeleteTaskDto = {
  userId: string
  id: string
}

export type GetTasksByDateDto = {
  date: string
  userId: string
}

export type SearchTasksDto = {
  title: string
  userId: string
}

export type CreateTaskDto = {
  title: string
  userId: string
  date: string
}

export type UpdateTaskDto = {
  title: string
  completed: boolean
  userId: string
  date: string
  id: string
}

export type UpdateTaskResponseDto = TaskDto

export type SearchTasksResponseDto = TaskDto[]

export type GetTasksByDateResponseDto = TaskDto[]

export type DeleteTaskResponseDto = TaskDto

export type CreateTaskResponseDto = TaskDto
