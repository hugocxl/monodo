// Dependencies
import { apiClient } from '../../libs'
import { useCommand, type UseCommandOptions } from '../use-command'

// Types
type UseSearchTasksFn = typeof apiClient.tasks.search
type UseSearchTasksReturn = Awaited<ReturnType<typeof apiClient.tasks.search>>
type UseSearchTasksArgs = Parameters<UseSearchTasksFn>[0]

export const useSearchTasksCommand = (
  options?: UseCommandOptions<UseSearchTasksReturn, Error, UseSearchTasksArgs>
) => {
  return useCommand<UseSearchTasksReturn, Error, UseSearchTasksArgs>({
    ...options,
    commandKey: ['search'],
    commandFn: (updateTask: UseSearchTasksArgs) =>
      apiClient.tasks.search(updateTask)
  })
}
