import { NextFunction, Request, Response } from 'express'
import IStoreSellerService from '../Contracts/interfaces/services/IStoreSellerService'
import PrismaErrorHandler from '../Errors/PrismaErrorsHandler'
import isPrismaError from '../Utils/isPrismaError'

class StoreSellerController {
  private _service: IStoreSellerService
  constructor(service: IStoreSellerService) {
    this._service = service
  }

  createOrUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storesAndSellers } = req.body
      const data =
        await this._service.createOrUpdateStoreSeller(storesAndSellers)
      return res.status(201).json(data)
    } catch (error) {
      if (isPrismaError(error)) {
        const prismaError = PrismaErrorHandler.handleErrors(error)
        next(prismaError)
      } else {
        next(error)
      }
    }
  }
}

export default StoreSellerController
