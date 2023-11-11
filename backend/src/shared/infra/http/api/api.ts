import express, { Router } from 'express'
import { usersRouter } from '@/modules/users/infra'
import { tasksRouter } from '@/modules/tasks/infra'

const router: Router = express.Router()

router.use('/users', usersRouter)
router.use('/tasks', tasksRouter)

export { router }
