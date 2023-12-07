import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'
import StatusCode from 'status-code-enum'

class StoreValidation {
  static nameRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { name } = req.body
    if (name) {
      next()
    } else {
      next(
        new CustomError(
          'name field must be filled',
          StatusCode.ClientErrorBadRequest,
        ),
      )
    }
  }
}

export default StoreValidation
