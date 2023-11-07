// Dependencies
import { useQuery } from '../use-query'
import { apiClient } from '../../libs'

// Types
import type { UseQueryOptions } from '../use-query'

type UseGetTasksByDateFn = typeof apiClient.tasks.getByDate
type UseGetTasksByDateReturn = ReturnType<typeof apiClient.tasks.getByDate>
type UseGetTasksByDateData = Awaited<UseGetTasksByDateReturn>
type UseGetTasksByDateArgs = Parameters<UseGetTasksByDateFn>[0]

type UseGetTasksByDateProps = UseQueryOptions<
  UseGetTasksByDateReturn,
  { message: string },
  UseGetTasksByDateData
> &
  UseGetTasksByDateArgs

export const useTasksByDateQuery = ({
  date,
  userId,
  ...rest
}: UseGetTasksByDateProps) => {
  return useQuery<
    UseGetTasksByDateReturn,
    { message: string },
    UseGetTasksByDateData
  >({
    ...rest,
    queryKey: ['tasks', date],
    queryFn: () => apiClient.tasks.getByDate({ date, userId })
  })
}
