import { NextFunction, Request, Response } from 'express'
import CustomError from '../Errors/CustomError'
import StatusCode from 'status-code-enum'

class StoreValidation {
  static storeRequired = (req: Request, _res: Response, next: NextFunction) => {
    const { store } = req.body
    if (store) {
      next()
    } else {
      next(
        new CustomError(
          'store field must be filled',
          StatusCode.ClientErrorBadRequest,
        ),
      )
    }
  }

  static addressRequired = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { state, city, street } = req.body

    if (!state || !city || !street) {
      const error = new CustomError(
        'Os seguintes campos são obrigatórios: state, city, street',
        StatusCode.ClientErrorBadRequest,
      )
      next(error)
    } else {
      next()
    }
  }
}

export default StoreValidation
