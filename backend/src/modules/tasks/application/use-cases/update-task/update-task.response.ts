// Dependencies
import { UserDoesntExistError } from './update-task.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { UpdateTaskResponseDto } from './update-task.dto'

export type UpdateTaskResponse = Either<
  UserDoesntExistError | AppError,
  Result<UpdateTaskResponseDto>
>
