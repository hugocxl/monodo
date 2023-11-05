import { usersRepository } from '@/modules/users/repos'
import { SignUpController } from './sign-up.controller'
import { SignUpUseCase } from './sign-up.use-case'

export const signUpUseCase = new SignUpUseCase(usersRepository)
export const signUpController = new SignUpController(signUpUseCase)
