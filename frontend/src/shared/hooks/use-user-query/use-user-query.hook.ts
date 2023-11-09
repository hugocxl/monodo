// Dependencies
import { apiClient } from '../../libs'
import { useSuspenseQuery } from '@tanstack/react-query'

// Types
import { type UseSuspenseQueryResult } from '@tanstack/react-query'

type Data = Awaited<ReturnType<typeof apiClient.users.me>>

export const useUserQuery = (): UseSuspenseQueryResult<Data, Error> => {
  return useSuspenseQuery({
    queryKey: ['users', 'me'],
    queryFn: apiClient.users.me
  })
}
