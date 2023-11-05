// Dependencies
import {
  PasswordDoesntMatchError,
  UserEmailDoesntExistError
} from './sign-in.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { SignInResponseDto } from './sign-in.dto'

export type SignInResponse = Either<
  PasswordDoesntMatchError | UserEmailDoesntExistError | AppError,
  Result<SignInResponseDto>
>
