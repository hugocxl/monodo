// Dependencies
import { UserDoesntExistError } from './delete-task.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { DeleteTaskResponseDto } from './delete-task.dto'

export type DeleteTaskResponse = Either<
  UserDoesntExistError | AppError,
  Result<DeleteTaskResponseDto>
>
