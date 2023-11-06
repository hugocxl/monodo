import express, { Router } from 'express'
import { createTaskController } from '../../application'

const tasksRouter: Router = express.Router()

tasksRouter.post('/create', (req, res) =>
  createTaskController.execute(req, res)
)

export { tasksRouter }
