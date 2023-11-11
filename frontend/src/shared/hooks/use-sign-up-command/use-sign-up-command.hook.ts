// Dependencies
import { apiClient } from '../../libs'
import { useCommand, type UseCommandOptions } from '../use-command'

// Types
type UseSignUpFn = typeof apiClient.users.signUp
type UseSignUpReturn = Awaited<ReturnType<typeof apiClient.users.signUp>>
type UseSignUpArgs = Parameters<UseSignUpFn>[0]
type UseSignUpProps = UseCommandOptions<
  UseSignUpReturn,
  { message: string },
  UseSignUpArgs
>

export const useSignUpCommand = (props?: UseSignUpProps) => {
  return useCommand<UseSignUpReturn, Error, UseSignUpArgs>({
    ...props,
    commandKey: ['users', 'signUp'],
    commandFn: (newTodo: UseSignUpArgs) => apiClient.users.signUp(newTodo)
  })
}
