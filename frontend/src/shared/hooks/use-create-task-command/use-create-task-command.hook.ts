// Dependencies
import { apiClient } from '../../libs'
import { useCommand, type UseCommandOptions } from '../use-command'

// Types
type UseCreateTaskFn = typeof apiClient.tasks.create
type UseCreateTaskReturn = Awaited<ReturnType<typeof apiClient.tasks.create>>
type UseCreateTaskArgs = Parameters<UseCreateTaskFn>[0]

export const useCreateTaskCommand = (
  date: string,
  options: UseCommandOptions<UseCreateTaskReturn, Error, UseCreateTaskArgs>
) => {
  return useCommand<UseCreateTaskReturn, Error, UseCreateTaskArgs>({
    ...options,
    commandKey: ['tasks', date],
    commandFn: (updateTask: UseCreateTaskArgs) =>
      apiClient.tasks.create(updateTask)
  })
}
