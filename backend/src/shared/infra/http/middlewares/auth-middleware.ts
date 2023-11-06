import type { NextFunction, Response } from 'express'
import type { AuthRequest } from '..'

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.logged) {
    return res.status(401).json({ code: 'unauthorized' })
  }

  next()
}
