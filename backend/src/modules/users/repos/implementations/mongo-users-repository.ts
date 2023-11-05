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
    const user = await this.model.find({ email: userEmail })

    return UserMapper.toDomain(user[0])
  }

  async exists(userEmail: UserEmail | string) {
    const exists = await this.model.exists({ email: userEmail })

    return Boolean(exists)
  }

  async create(user: User) {
    const exists = await this.exists(user.email.value)

    if (!exists) {
      const rawSequelizeUser = await UserMapper.toPersistence(user)
      await this.model.create(rawSequelizeUser)
    }

    return
  }
}
