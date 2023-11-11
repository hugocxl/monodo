// Dependencies
import { useQuery as useReactQuery } from '@tanstack/react-query'
import { useUser } from '../use-user-query'

// Types
import type { UseQueryOptions, UseQueryResult } from './use-query.types'

export const useQuery = <Data, Error>({
  queryFn,
  queryKey,
  ...options
}: UseQueryOptions<Data, Error>): UseQueryResult<Data, Error> => {
  const [user] = useUser()

  const key = [user?.id as string, ...queryKey]

  return useReactQuery({
    ...options,
    queryKey: key,
    queryFn
  })
}
