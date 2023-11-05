// Dependencies
import { EmailAlreadyTakenError } from './sign-up.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { SignUpResponseDto } from './sign-up.dto'

export type SignUpResponse = Either<
  EmailAlreadyTakenError | AppError,
  Result<SignUpResponseDto>
>
