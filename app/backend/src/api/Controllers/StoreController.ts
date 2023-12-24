import StatusCode from 'status-code-enum'
import IStoreService from '../Contracts/interfaces/services/IStoreService'
import { IDbStore } from '../Contracts/interfaces/stores'
import Store from '../Domains/Store'
import AbstractController from './AbstractController'
import { NextFunction, Request, Response } from 'express'

class StoreController extends AbstractController<
  Store,
  IDbStore,
  IStoreService
> {
  getNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { includeInactive } = req.query
      const storeNames = await this.service.getNames(includeInactive)
      res.status(StatusCode.SuccessOK).json(storeNames)
    } catch (error) {
      next(error)
    }
  }
}

export default StoreController
