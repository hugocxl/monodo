import { userModel } from '../../../shared/infra/database'
import { MongoUsersRepository } from './implementations/mongo-users-repository'

export const usersRepository = new MongoUsersRepository(userModel)

export * from './users.repository'
