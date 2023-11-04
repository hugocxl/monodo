import mongoose from 'mongoose'
import { config } from './config'
import { logger } from './shared/logger'
import { app } from './app'

let server: any
mongoose.connect(config.mongoose.url).then(() => {
  logger.info('DB', 'Connected to database ✅')
  server = app.listen(config.port, () => {
    logger.info('App', `Listening to port ${config.port} ✅`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Exit', 'Server closed ❌')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: string) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)
process.on('SIGINT', exitHandler)

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM received')
//   if (server) {
//     server.close()
//   }
// })
