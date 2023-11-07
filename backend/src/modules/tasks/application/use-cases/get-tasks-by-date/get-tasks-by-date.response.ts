// Dependencies
import { UserDoesntExistError } from './get-tasks-by-date.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { GetTasksByDateResponseDto } from './get-tasks-by-date.dto'

export type GetTasksByDateResponse = Either<
  UserDoesntExistError | AppError,
  Result<GetTasksByDateResponseDto>
>
