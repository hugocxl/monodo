// Dependencies
import { useQuery } from '../use-query'
import { apiClient } from '../../libs'

// Types
import type { UseQueryResult } from '../use-query'

type UseGetTasksByDateFn = typeof apiClient.tasks.getByDate
type Data = Awaited<ReturnType<typeof apiClient.tasks.getByDate>>
type Props = Parameters<UseGetTasksByDateFn>[0]

export const useTasksByDateQuery = ({
  date,
  userId
}: Props): UseQueryResult<Data, Error> => {
  return useQuery({
    queryKey: ['tasks', date],
    queryFn: () => apiClient.tasks.getByDate({ date, userId })
  })
}
