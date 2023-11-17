import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'

class StoreValidation {
  static nameRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { name } = req.body
    if (name) {
      next()
    } else {
      next(new CustomError('name field must be filled', '400'))
    }
  }
}

export default StoreValidation
