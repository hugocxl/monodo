// @ts-nocheck
// See: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/53397

// Dependencies
import morgan from 'morgan'
import { logger } from './logger'
import { config } from '@/config'

// Types
import type { Request, Response } from 'express'

morgan.token(
  'message',
  (_req: Request, res: Response) => res.locals['errorMessage'] || ''
)

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '')
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode >= 400,
  stream: { write: (message: string) => logger.info(message.trim()) }
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req: Request, res: Response) => res.statusCode < 400,
  stream: { write: (message: string) => logger.error(message.trim()) }
})

export const morganLogger: any = {
  successHandler,
  errorHandler
}
