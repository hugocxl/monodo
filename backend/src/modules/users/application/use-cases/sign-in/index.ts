import { SignInController } from './sign-in.controller'
import { SignInUseCase } from './sign-in.use-case'
import { usersRepository } from '@/modules/users/repos'

export const signInUseCase = new SignInUseCase(usersRepository)
export const signInController = new SignInController(signInUseCase)
