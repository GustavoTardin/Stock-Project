import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import AbstractService from '../Services/AbstractService';
import AbstractODM from '../Models/AbstractODM';

abstract class AbstractController<
    DocumentType extends Document,
    ODMType extends AbstractODM<DocumentType>,
    ServiceType extends AbstractService<DocumentType, ODMType>> {
  protected service: ServiceType;
  constructor(service: ServiceType) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAll();
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default AbstractController;