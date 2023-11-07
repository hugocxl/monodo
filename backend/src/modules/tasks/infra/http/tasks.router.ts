import express, { Router } from 'express'
import {
  createTaskController,
  deleteTaskController,
  getTasksByDateController,
  searchTasksController,
  updateTaskController
} from '../../application'

const tasksRouter: Router = express.Router()

tasksRouter.post('/create', (req, res) =>
  createTaskController.execute(req, res)
)
tasksRouter.put('/update', (req, res) => updateTaskController.execute(req, res))
tasksRouter.delete('/delete', (req, res) =>
  deleteTaskController.execute(req, res)
)
tasksRouter.post('/search', (req, res) =>
  searchTasksController.execute(req, res)
)
tasksRouter.post('/get-by-date', (req, res) =>
  getTasksByDateController.execute(req, res)
)

export { tasksRouter }
