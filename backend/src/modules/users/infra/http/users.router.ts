// Dependencies
import express, { Router } from 'express'
import { signInController, signUpController } from '../../application'

// Types
import type { AuthRequest } from '@/shared/infra'

const usersRouter: Router = express.Router()

usersRouter.post('/sign-in', (req, res) => signInController.execute(req, res))
usersRouter.post('/sign-up', (req, res) => signUpController.execute(req, res))
usersRouter.post('/sign-out', (req: AuthRequest, res) => {
  return res.status(200).json({ message: 'logged out' })
})
usersRouter.get('/me', (req: AuthRequest, res) => res.json({ message: 'ok' }))

export { usersRouter }
