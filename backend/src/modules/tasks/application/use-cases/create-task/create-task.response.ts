// Dependencies
import { UserDoesntExistError } from './create-task.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { CreateTaskResponseDto } from './create-task.dto'

export type CreateTaskResponse = Either<
  UserDoesntExistError | AppError,
  Result<CreateTaskResponseDto>
>
