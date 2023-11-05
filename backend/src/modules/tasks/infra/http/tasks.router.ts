import express, { Router } from 'express'
// import { signInController, signUpController } from '../../application'

const tasksRouter: Router = express.Router()

// tasksRouter.post('/sign-in', (req, res) => signInController.execute(req, res))
// tasksRouter.post('/sign-up', (req, res) => signUpController.execute(req, res))

export { tasksRouter }
