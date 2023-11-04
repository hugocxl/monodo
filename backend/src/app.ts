import express from 'express'
import helmet from 'helmet'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
// import httpStatus from 'http-status'
import { config } from './config'
import { morganLogger } from './shared/logger'
// import { jwtStrategy } from './modules/auth'
// import { authLimiter } from './modules/utils'
// import { ApiError, errorConverter, errorHandler } from './modules/errors'
// import routes from './routes/v1'

const app: any = express()

if (config.env !== 'test') {
  app.use(morganLogger.successHandler)
  app.use(morganLogger.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// enable cors
app.use(cors())
app.options('*', cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// sanitize request data
app.use(ExpressMongoSanitize())

// gzip compression
app.use(compression())

// jwt authentication
app.use(passport.initialize())
// passport.use('jwt', jwtStrategy)

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  // app.use('/v1/auth', authLimiter)
}

// v1 api routes
// app.use('/v1', routes)

// send back a 404 error for any unknown api request
// app.use((_req, _res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
// })

// convert error to ApiError, if needed
// app.use(errorConverter)

// handle error
// app.use(errorHandler)

export { app }
