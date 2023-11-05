// Dependencies
import { Result, AppError, left, right } from '@/shared/core'
import { UserEmail, UserPassword } from '@/modules/users/domain'
import {
  UserEmailDoesntExistError,
  PasswordDoesntMatchError
} from './sign-in.error'

// Types
import type { SignInDto, SignInResponseDto } from './sign-in.dto'
import type { SignInResponse } from './sign-in.response'
import type { UseCase } from '@/shared/core'
import type { UsersRepository } from '@/modules/users/repos'

export class SignInUseCase
  implements UseCase<SignInDto, Promise<SignInResponse>>
{
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(signInDto: SignInDto): Promise<SignInResponse> {
    try {
      const emailOrError = UserEmail.create(signInDto.email)
      const passwordOrError = UserPassword.create({
        value: signInDto.password
      })
      const dtoResult = Result.combine([emailOrError, passwordOrError])

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getError())) as SignInResponse
      }

      const email = emailOrError.getValue()
      const password = passwordOrError.getValue()

      const user = await this.usersRepository.getUserByEmail(email.value)

      const userFound = !!user

      if (!userFound) {
        return left(
          new UserEmailDoesntExistError(email.value)
        ) as SignInResponse
      }

      const passwordValid = await user.password.comparePassword(password.value)

      if (!passwordValid) {
        return left(new PasswordDoesntMatchError()) as SignInResponse
      }

      return right(Result.ok<SignInResponseDto>({ email: user.email.value }))
    } catch (err) {
      return left(new AppError(err)) as SignInResponse
    }
  }
}
