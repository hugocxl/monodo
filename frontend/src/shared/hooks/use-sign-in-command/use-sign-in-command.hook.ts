// Dependencies
import { apiClient } from '../../libs'
import { useCommand } from '../use-command'

// Types
import { type UseCommandOptions } from '../use-command'

type UseSignInFn = typeof apiClient.users.signIn
type UseSignInReturn = Awaited<ReturnType<typeof apiClient.users.signIn>>
type UseSignInArgs = Parameters<UseSignInFn>[0]
type UseSignInProps = UseCommandOptions<
  UseSignInReturn,
  { message: string },
  UseSignInArgs
>

export const useSignInCommand = (options?: UseSignInProps) => {
  return useCommand<UseSignInReturn, { message: string }, UseSignInArgs>({
    ...options,
    commandKey: ['users', 'signIn'],
    commandFn: (newTodo: UseSignInArgs) => apiClient.users.signIn(newTodo)
  })
}
