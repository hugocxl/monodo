import type { QueryOptions } from '@tanstack/react-query'

export type UseQueryOptions<Data = unknown, Error = unknown> = QueryOptions<
  Data,
  Error,
  Data
> & {
  queryKey: string[]
}

export { type UseQueryResult } from '@tanstack/react-query'
