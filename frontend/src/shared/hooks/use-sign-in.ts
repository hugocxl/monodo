import { useMutation } from 'react-query'
import { apiClient } from '../libs'

export const useSignIn = () => {
  return useMutation({
    mutationFn: (newTodo: Parameters<typeof apiClient.users.signIn>[0]) =>
      apiClient.users.signIn(newTodo)
  })
}
