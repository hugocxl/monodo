// Dependencies
import { UserMapper } from '../../mappers'

// Types
import type mongoose from 'mongoose'
import type { User, UserEmail } from '../../domain'
import type { UsersRepository } from '../users.repository'

export class MongoUsersRepository implements UsersRepository {
  private model: mongoose.Model<User>

  constructor(model: mongoose.Model<User>) {
    this.model = model
  }

  async getUserByEmail(userEmail: UserEmail | string) {
    const user = await this.model.findOne({ email: userEmail })

    if (user) {
      return UserMapper.toDomain(user)
    }

    return null
  }

  async getUserById(id: string) {
    const user = await this.model.findOne({ _id: id })

    if (user) {
      return UserMapper.toDomain(user)
    }

    return null
  }

  async exists(userEmail: UserEmail | string) {
    const exists = await this.model.exists({ email: userEmail })

    return Boolean(exists)
  }

  async create(user: User) {
    const rawUser = await UserMapper.toPersistence(user)
    const response = await this.model.create(rawUser)

    return UserMapper.toDomain(response)
  }
}
