export type UserDto = {
  email: string
  id: string
}

export type TaskDto = {
  title: string
  description: string
  date: string
  completed: boolean
  id: string
}

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

export type CreateTaskDto = {
  title: string
  description: string
  userId: string
  date: string
}

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

export type UpdateTaskDto = {
  title: string
  description: string
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
