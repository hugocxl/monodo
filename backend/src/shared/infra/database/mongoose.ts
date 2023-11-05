import mongoose from 'mongoose'
import { config } from '@/config'
import { logger } from '@/shared/utils'

export function startDb() {
  mongoose
    .connect(config.mongoose.url, {
      dbName: config.mongoose.dbName
    })
    .then(() => {
      logger.info('DB', 'Connected to database ✅')
    })
    .catch(() => {
      logger.error('DB', 'Error connecting to database ❌')
    })
}
