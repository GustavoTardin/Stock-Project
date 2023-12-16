import express, { NextFunction, Request, Response } from 'express'
import ErrorHandler from './api/Errors/ErrorHandler'
import { storeSellerRouter, userRouter } from './api/Routes'

const accessControl: express.RequestHandler = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,OPTIONS,PUT,PATCH',
  )
  res.header('Access-Control-Allow-Headers', '*')
  next()
}
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(accessControl)
app.use('/users', userRouter)
app.use('/store-sellers', storeSellerRouter)

app.use(ErrorHandler.handle)

export default app
