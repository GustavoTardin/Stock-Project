import { NextFunction, Request, Response } from 'express'
import IStoreSellerService from '../Contracts/interfaces/services/IStoreSellerService'

class StoreSellerController {
  private _service: IStoreSellerService
  constructor(service: IStoreSellerService) {
    this._service = service
  }

  createOrUpdate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storesAndSeller } = req.body
      const data =
        await this._service.createOrUpdateStoreSeller(storesAndSeller)
      return res.status(201).json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export default StoreSellerController
