import { useMutation } from 'react-query'
import { apiClient } from '../libs'

export const useSignUp = () => {
  return useMutation(apiClient.users.signUp)
}
