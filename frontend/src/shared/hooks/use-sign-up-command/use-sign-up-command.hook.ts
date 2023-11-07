// Dependencies
import { apiClient } from '../../libs'
import { useCommand } from '../use-command'

// Types
import { type UseCommandOptions } from '../use-command'

type UseSignUpFn = typeof apiClient.users.signUp
type UseSignUpReturn = Awaited<ReturnType<typeof apiClient.users.signUp>>
type UseSignUpArgs = Parameters<UseSignUpFn>[0]
type UseSignUpProps = UseCommandOptions<UseSignUpReturn, null, UseSignUpArgs>

export const useSignUpCommand = (props?: UseSignUpProps) => {
  return useCommand<UseSignUpReturn, null, UseSignUpArgs>({
    ...props,
    commandKey: ['users', 'signUp'],
    commandFn: (newTodo: UseSignUpArgs) => apiClient.users.signUp(newTodo)
  })
}
