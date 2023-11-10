import { beforeAll, describe, expect, test } from 'vitest'
import { CreateTaskUseCase } from '../src/modules/tasks/application/use-cases/create-task/create-task.use-case'
import { TasksRepositoryMock, UsersRepositoryMock } from './mocks'

const usersRepositoryMock = new UsersRepositoryMock()
const tasksRepositoryMock = new TasksRepositoryMock()

describe('CreateTaskUseCase', () => {
  let sut: CreateTaskUseCase

  beforeAll(() => {
    sut = new CreateTaskUseCase(usersRepositoryMock, tasksRepositoryMock)
  })
  test('should init', async () => {
    expect(sut).toBeDefined()
    expect(sut).toBeInstanceOf(CreateTaskUseCase)
    expect(sut.execute).toBeDefined()
  })
  test('should return an error if the length of title is not correct', async () => {
    const resultOrError = await sut.execute({
      title: '',
      userId: '123456',
      date: '10-10-1990'
    })
    const error = resultOrError.value.getError()

    expect(error).toBe('Title doesnt meet criteria [8 chars min].')
  })
  test('should return an error if the date is not valid', async () => {
    const resultOrError = await sut.execute({
      title: 'test',
      userId: '123456',
      date: 'aavb12'
    })
    const error = resultOrError.value.getError()

    expect(error).toBe('Date is not a valid date.')
  })
  test('should create a task', async () => {
    const resultOrError = await sut.execute({
      title: 'test task',
      userId: '123456',
      date: '10-10-1990'
    })
    const result = resultOrError.value.getValue()

    expect(result.title).toBe('test task')
  })
})
