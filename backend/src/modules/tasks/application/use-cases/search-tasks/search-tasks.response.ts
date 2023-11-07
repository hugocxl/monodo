// Dependencies
import { UserDoesntExistError } from './search-tasks.error'

// Types
import type { Either, AppError, Result } from '@/shared/core'
import type { SearchTasksResponseDto } from './search-tasks.dto'

export type SearchTasksResponse = Either<
  UserDoesntExistError | AppError,
  Result<SearchTasksResponseDto>
>
