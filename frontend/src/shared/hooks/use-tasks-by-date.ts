import { useQuery } from 'react-query'
import { apiClient } from '../libs'

export const useTasksByDate = (
  props: Parameters<typeof apiClient.tasks.getByDate>[0]
) => {
  return useQuery({
    queryKey: ['tasks', props.date],
    queryFn: () => apiClient.tasks.getByDate(props)
  })
}
