// Dependencies
import { useQuery as useReactQuery } from '@tanstack/react-query'

// Types
import type { UseQueryOptions, UseQueryResult } from './use-query.types'

export const useQuery = <Data, Error>({
  queryFn,
  queryKey,
  ...options
}: UseQueryOptions<Data, Error>): UseQueryResult<Data, Error> => {
  return useReactQuery({
    ...options,
    queryKey,
    queryFn
  })
}
