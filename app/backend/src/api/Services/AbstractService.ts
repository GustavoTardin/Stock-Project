import StatusCode from 'status-code-enum'
import IModel from '../Contracts/interfaces/models/IModel'
import IService from '../Contracts/interfaces/services/IService'
import DomainFactory from '../Utils/DomainFactory'
import CustomError from '../Errors/CustomError'

abstract class AbstractService<T, dbRes, dbCreate>
  implements IService<T, dbRes>
{
  private _model: IModel<dbRes, dbCreate>
  domainName: string

  constructor(model: IModel<dbRes, dbCreate>, domain: string) {
    this._model = model
    this.domainName = domain
  }

  async getAll(query: unknown): Promise<T[]> {
    const includeInactive = query === 'true'
    const all = await this._model.getAll(includeInactive)
    const domains = all.map((e) =>
      DomainFactory.createDomain<T>(this.domainName, e),
    )
    return domains
  }

  async getById(id: number, query: unknown): Promise<T> {
    const includeInactive = query === 'true'
    // se não existir, lança erro 404
    const obj = await this.verifyIfExistsById(id, includeInactive)
    const domain = DomainFactory.createDomain<T>(this.domainName, obj)
    return domain
  }

  async verifyIfExistsById(
    id: number,
    includeInactive: boolean,
  ): Promise<dbRes> {
    const obj = await this._model.getById(id, includeInactive)
    if (!obj) {
      throw new CustomError(
        `${this.domainName} não existe`,
        StatusCode.ClientErrorNotFound,
      )
    } else {
      return obj
    }
  }
}

export default AbstractService
