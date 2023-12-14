import StatusCode from 'status-code-enum'
import IService from '../Contracts/interfaces/services/IService'
import { NextFunction, Request, Response } from 'express'

abstract class AbstractController<
  T,
  DbRes,
  Service extends IService<T, DbRes>,
> {
  protected service: Service

  constructor(service: Service) {
    this.service = service
  }

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { includeInactive } = req.query
      const domains = await this.service.getAll(includeInactive)
      res.status(StatusCode.SuccessOK).json(domains)
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { includeInactive } = req.query
      const { id } = req.params
      const domain = await this.service.getById(Number(id), includeInactive)
      res.status(StatusCode.SuccessOK).json(domain)
    } catch (error) {
      next(error)
    }
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdData = await this.service.create(req.body)
      res.status(StatusCode.SuccessCreated).json(createdData)
    } catch (error) {
      next(error)
    }
  }
}

export default AbstractController
