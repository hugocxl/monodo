import type { User } from '../domain'

export type UsersRepository = {
  exists(email: string): Promise<boolean>
  getUserByEmail(email: string): Promise<User | null>
  getUserById(id: string): Promise<User | null>
  create(user: User): Promise<User | null>
}
