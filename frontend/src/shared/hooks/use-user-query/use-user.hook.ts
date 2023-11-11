// Dependencies
import { useLocalStorage } from '../use-local-storage'

// Types
import type { UserDto } from '@/shared/types'

export const useUser = () => {
  return useLocalStorage<UserDto>('user')
}
