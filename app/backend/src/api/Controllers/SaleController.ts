import { NextFunction, Request, Response } from 'express';
import ISale from '../Contracts/interfaces/sales/ISale';
import ISaleODM from '../Contracts/interfaces/sales/ISaleODM';
import ISaleService from '../Contracts/interfaces/sales/ISaleService';
import AbstractController from './AbstractController';
import { SaleSummary } from '../Domains';

class SaleController extends AbstractController<ISale, ISaleODM, ISaleService> {
  constructor(service: ISaleService) {
    super('sale', service);
  }

  createSaleSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newSaleSummary = await this.service.createSaleSummary(req.body);
      const domain = new SaleSummary(newSaleSummary);
      res.status(201).json(domain);
    } catch (error) {
      next(error);
    }
  };
}

export default SaleController;