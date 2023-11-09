// Dependencies
import { apiClient } from '../../libs'
import { useCommand } from '../use-command'

type UseDeleteTaskFn = typeof apiClient.tasks.delete
type UseDeleteTaskReturn = Awaited<ReturnType<typeof apiClient.tasks.delete>>
type UseDeleteTaskArgs = Parameters<UseDeleteTaskFn>[0]

export const useDeleteTaskCommand = (date: string) => {
  return useCommand<UseDeleteTaskReturn, Error, UseDeleteTaskArgs>({
    commandKey: ['tasks', date],
    commandFn: (newTodo: UseDeleteTaskArgs) => apiClient.tasks.delete(newTodo)
  })
}
