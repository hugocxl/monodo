import { usersRouter } from '@/modules/users/infra'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', (req, res) => {
  return res.json({ message: "Yo! we're up" })
})

router.use('/users', usersRouter)

export { router }
