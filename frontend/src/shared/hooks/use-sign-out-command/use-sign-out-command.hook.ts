// Dependencies
import { apiClient } from '../../libs'
import { useCommand } from '../use-command'

export const useSignOutCommand = () => {
  return useCommand({
    commandKey: ['users', 'signOut'],
    commandFn: apiClient.users.signOut
  })
}
