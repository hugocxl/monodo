import { Fetcher } from '../fetcher'
import type {
  CreateTaskDto,
  CreateTaskResponseDto,
  DeleteTaskDto,
  DeleteTaskResponseDto,
  GetTasksByDateDto,
  GetTasksByDateResponseDto,
  SearchTasksDto,
  SearchTasksResponseDto,
  SignInDto,
  SignInResponseDto,
  SignUpDto,
  UpdateTaskDto,
  UpdateTaskResponseDto
} from './api-client.types'

const usersEndpoint = `${import.meta.env.VITE_API_URL}/users`
const tasksEndpoint = `${import.meta.env.VITE_API_URL}/tasks`

export const apiClient = {
  users: {
    signIn: (signInDto: SignInDto) =>
      Fetcher.post<SignInResponseDto, SignInDto>(`${usersEndpoint}/sign-in`, {
        body: signInDto
      }),
    signUp: (signUpDto: SignUpDto) =>
      Fetcher.post<SignInResponseDto, SignUpDto>(`${usersEndpoint}/sign-in`, {
        body: signUpDto
      })
  },
  tasks: {
    create: (createTaskDto: CreateTaskDto) =>
      Fetcher.post<CreateTaskResponseDto, CreateTaskDto>(
        `${tasksEndpoint}/create`,
        { body: createTaskDto }
      ),
    update: (updateTaskDto: UpdateTaskDto) =>
      Fetcher.put<UpdateTaskResponseDto, UpdateTaskDto>(
        `${tasksEndpoint}/update`,
        { body: updateTaskDto }
      ),
    delete: (deleteTaskDto: DeleteTaskDto) =>
      Fetcher.delete<DeleteTaskResponseDto, DeleteTaskDto>(
        `${tasksEndpoint}/delete`,
        { body: deleteTaskDto }
      ),
    search: (searchTasksDto: SearchTasksDto) =>
      Fetcher.post<SearchTasksResponseDto, SearchTasksDto>(
        `${tasksEndpoint}/search`,
        { body: searchTasksDto }
      ),
    getByDate: (searchTasksDto: GetTasksByDateDto) =>
      Fetcher.post<GetTasksByDateResponseDto, GetTasksByDateDto>(
        `${tasksEndpoint}/get-by-date`,
        { body: searchTasksDto }
      )
  }
}
