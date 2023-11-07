import express, { Router } from 'express'
import {
  createTaskController,
  searchTasksController,
  updateTaskController
} from '../../application'

const tasksRouter: Router = express.Router()

tasksRouter.post('/create', (req, res) =>
  createTaskController.execute(req, res)
)
tasksRouter.post('/update', (req, res) =>
  updateTaskController.execute(req, res)
)
tasksRouter.post('/search', (req, res) =>
  searchTasksController.execute(req, res)
)

export { tasksRouter }
