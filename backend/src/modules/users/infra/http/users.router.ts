import express, { Router } from 'express'
import { signInController, signUpController } from '../../application'

const usersRouter: Router = express.Router()

usersRouter.post('/sign-in', (req, res) => signInController.execute(req, res))
usersRouter.post('/sign-up', (req, res) => signUpController.execute(req, res))

export { usersRouter }
