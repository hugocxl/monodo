import { useQuery } from 'react-query'
import { apiClient } from '../libs'

export const useUpdateTasks = (
  props: Parameters<typeof apiClient.tasks.update>[0]
) => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => apiClient.tasks.update(props)
  })
}
