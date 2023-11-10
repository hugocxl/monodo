import type { UsersRepository } from '../../src/modules/users/repos'
import { UserMapper } from '../../src/modules/users/mappers'

const mockUser = {
  _id: { toString: () => '123' },
  email: 'sample@email.com',
  password: '123456'
}

export class UsersRepositoryMock implements UsersRepository {
  async exists() {
    await Promise.resolve(null)
    return true
  }

  async getUserByEmail() {
    await Promise.resolve(null)

    return UserMapper.toDomain(mockUser)
  }

  async getUserById() {
    await Promise.resolve(null)

    return UserMapper.toDomain(mockUser)
  }

  async create() {
    await Promise.resolve(null)

    return UserMapper.toDomain(mockUser)
  }
}
