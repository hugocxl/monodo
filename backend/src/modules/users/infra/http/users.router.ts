import express, { Router } from 'express'
import { signInController, signUpController } from '../../application'
import type { AuthRequest } from '@/shared/infra'

const usersRouter: Router = express.Router()

usersRouter.post('/sign-in', (req, res) => signInController.execute(req, res))
usersRouter.post('/sign-up', (req, res) => signUpController.execute(req, res))
usersRouter.get('/me', (req: AuthRequest, res) => {
  if (req.session.logged) {
    res.json(req.session)
  } else {
    res.status(404).json({ message: 'user not logged' })
  }
})
usersRouter.post('/sign-out', (req: AuthRequest, res) => {
  req.session.logged = false
  res.status(200).json({ message: 'logged out' })
})

export { usersRouter }
