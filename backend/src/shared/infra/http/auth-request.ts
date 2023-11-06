import * as Express from 'express'

export type AuthRequest = Express.Request & {
  session: {
    logged?: boolean
  }
}
