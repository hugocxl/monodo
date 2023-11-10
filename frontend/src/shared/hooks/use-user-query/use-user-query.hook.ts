// Dependencies
import { apiClient } from '../../libs'
import { useQuery } from '../use-query'

// Types
import { type UseQueryResult } from '../use-query'

type Data = Awaited<ReturnType<typeof apiClient.users.me>>

export const useUserQuery = (): UseQueryResult<Data, Error> => {
  return useQuery({
    queryKey: ['users', 'me'],
    queryFn: apiClient.users.me
  })
}
