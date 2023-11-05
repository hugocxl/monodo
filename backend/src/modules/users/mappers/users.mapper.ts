// Dependencies
import { User, UserPassword, UserEmail } from '../domain'

// Types
import type { Mapper } from '@/shared/infra'
import type { UserDto } from '../dto'

export class UserMapper implements Mapper<User> {
  public static toDto(user: User): UserDto {
    return {
      email: user.email.value
    }
  }

  public static toDomain(raw: any): User | null {
    const userEmailOrError = UserEmail.create(raw.email)
    const userPasswordOrError = UserPassword.create({
      value: raw.password,
      hashed: true
    })

    const userOrError = User.create({
      password: userPasswordOrError.getValue(),
      email: userEmailOrError.getValue()
    })

    if (userOrError.isFailure) {
      console.log(userOrError.getError())
      return null
    }

    return userOrError.getValue()
  }

  public static async toPersistence(user: User): Promise<any> {
    let password: string | null = null

    if (user.password) {
      if (user.password.isAlreadyHashed()) {
        password = user.password.value
      } else {
        password = await user.password.getHashedValue()
      }
    }

    return {
      email: user.email.value,
      password
    }
  }
}
