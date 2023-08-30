import { NextFunction, Request, Response } from 'express';
import { IStore, IStoreODM, IStoreService } from '../interfaces/stores';
import AbstractController from './AbstractController';

class StoreController extends AbstractController<IStore, IStoreODM, IStoreService> {
  constructor(service: IStoreService) {
    super('store', service);
  }

  getStoreNames = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeNames = await this.service.getStoreNames();
      res.status(200).json(storeNames);
    } catch (error) {
      next(error);
    }
  };

  createStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newStore = await this.service.createStore(req.body);
      res.status(201).json(newStore);
    } catch (error) {
      next(error);
    }
  };
}

export default StoreController;