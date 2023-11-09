import { apiClient } from '../../libs'
import { useCommand, type UseCommandOptions } from '../use-command'

type UseUpdateTaskFn = typeof apiClient.tasks.update
type UseUpdateTaskReturn = Awaited<ReturnType<typeof apiClient.tasks.update>>
type UseUpdateTaskArgs = Parameters<UseUpdateTaskFn>[0]

export const useUpdateTaskCommand = (
  date: string,
  options?: UseCommandOptions<UseUpdateTaskReturn, Error, UseUpdateTaskArgs>
) => {
  return useCommand<UseUpdateTaskReturn, Error, UseUpdateTaskArgs>({
    ...options,
    commandKey: ['tasks', date],
    commandFn: (updateTask: UseUpdateTaskArgs) =>
      apiClient.tasks.update(updateTask)
  })
}
