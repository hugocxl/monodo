// Dependencies
import { EmailAlreadyTakenError } from './sign-up.error'
import { Result, AppError, left, right } from '@/shared/core'
import { User, UserEmail, UserPassword } from '@/modules/users/domain'

// Types
import type { SignUpDto, SignUpResponseDto } from './sign-up.dto'
import type { SignUpResponse } from './sign-up.response'
import type { UseCase } from '@/shared/core'
import type { UsersRepository } from '@/modules/users/repos'

export class SignUpUseCase
  implements UseCase<SignUpDto, Promise<SignUpResponse>>
{
  private usersRepository: UsersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(signUpDto: SignUpDto): Promise<SignUpResponse> {
    try {
      const emailOrError = UserEmail.create(signUpDto.email)
      const passwordOrError = UserPassword.create({ value: signUpDto.password })
      const dtoResult = Result.combine([emailOrError, passwordOrError])

      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getError())) as SignUpResponse
      }

      const email = emailOrError.getValue()
      const password = passwordOrError.getValue()

      const userAlreadyExists = await this.usersRepository.exists(email.value)

      if (userAlreadyExists) {
        return left(new EmailAlreadyTakenError(email.value)) as SignUpResponse
      }

      const userOrError: Result<User> = User.create({
        email,
        password
      })

      if (userOrError.isFailure) {
        return left(
          Result.fail<User>(userOrError.getError().toString())
        ) as SignUpResponse
      }

      const user: User = userOrError.getValue()

      await this.usersRepository.create(user)

      return right(
        Result.ok<SignUpResponseDto>({ email: user.email.value, ok: true })
      )
    } catch (err) {
      return left(new AppError(err)) as SignUpResponse
    }
  }
}
