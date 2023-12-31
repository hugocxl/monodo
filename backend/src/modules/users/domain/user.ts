import { Guard, Result } from '../../../shared/core'
import { Entity } from '../../../shared/domain'
import type { UserEmail } from './user-email'
import type { UserPassword } from './user-password'

interface UserProps {
  email: UserEmail
  password: UserPassword
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id)
  }

  get id() {
    return this._id
  }

  get email(): UserEmail {
    return this.props.email
  }

  get password(): UserPassword {
    return this.props.password
  }

  public static create(props: UserProps, id?: string): Result<User> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.password, argumentName: 'password' },
      { argument: props.email, argumentName: 'email' }
    ])

    if (guardResult.isFailure) {
      return Result.fail<User>(guardResult.getError())
    }

    const user = new User(
      {
        ...props
      },
      id
    )

    return Result.ok<User>(user)
  }
}
