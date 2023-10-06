import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import { IStore, IStoreODM, IStoreService } from '../Contracts/interfaces/stores';
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
      const storeObj = { ...req.body, logoPath: req.file ? req.file.path : null };
      const newStore = await this.service.createStore(storeObj);
      res.status(201).json(newStore);
    } catch (error) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      next(error);
    }
  };
}

export default StoreController;