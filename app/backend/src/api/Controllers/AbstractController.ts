/* import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';
import AbstractService from '../Services/AbstractService';
import AbstractODM from '../Models/AbstractODM';
import DomainFactory from '../Utils/DomainFactory';

abstract class AbstractController<
    DocumentType extends Document,
    ODMType extends AbstractODM<DocumentType>,
    ServiceType extends AbstractService<DocumentType, ODMType>> {
  protected service: ServiceType;
  public domainType: string;
  constructor(domainType: string, service: ServiceType) {
    this.service = service;
    this.domainType = domainType;
  }

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getAll();
      const domains = data.map((e) => DomainFactory.createDomain(this.domainType, e));
      res.status(200).json(domains);
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const message = await this.service.deleteById(id);
      res.status(204).json(message);
    } catch (error) {
      next(error);
    }
  };
}

export default AbstractController;

*/