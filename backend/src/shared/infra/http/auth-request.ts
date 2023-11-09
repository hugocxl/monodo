import * as Express from 'express'

export type AuthRequest = Express.Request & {
  session: {
    user?:
      | {
          id: string
          email: string
        }
      | false
  }
}
