import express, { Router } from 'express'
import { usersRouter } from '@/modules/users/infra'
import { tasksRouter } from '@/modules/tasks/infra'
import { authMiddleware } from '../middlewares'

const router: Router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" })
})

router.use('/users', usersRouter)
router.use('/tasks', authMiddleware, tasksRouter)

export { router }
