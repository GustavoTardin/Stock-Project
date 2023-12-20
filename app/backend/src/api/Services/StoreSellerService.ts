import z from 'zod'
import IStoreSellerModel from '../Contracts/interfaces/models/IStoreSellerModel'
import storeSellerSchema from '../Contracts/zod/schemas/storeSellers/storeSellerSchema'
import { StoreSeller } from '../Domains'
import DomainTypes from '../Utils/DomainTypes'
import validateField from '../Utils/serviceValidation'
import DomainFactory from '../Utils/DomainFactory'
import IStoreSellerService from '../Contracts/interfaces/services/IStoreSellerService'
import { IUserModel } from '../Contracts/interfaces/users'
import { IStoreModel } from '../Contracts/interfaces/stores'
import CustomError from '../Errors/CustomError'
import { StatusCode } from 'status-code-enum'

class StoreSellerService implements IStoreSellerService {
  private _model: IStoreSellerModel
  private _userModel: IUserModel
  private _storeModel: IStoreModel
  private _domainName = DomainTypes.StoreSellers
  constructor(
    model: IStoreSellerModel,
    userModel: IUserModel,
    storeModel: IStoreModel,
  ) {
    this._model = model
    this._userModel = userModel
    this._storeModel = storeModel
  }

  async createOrUpdateStoreSeller(data: unknown): Promise<StoreSeller[]> {
    const validated = validateField<z.infer<typeof storeSellerSchema>>(
      storeSellerSchema,
      data,
    )
    const includeInactive = false
    const users = await Promise.all(
      validated.map((e) => this._userModel.getById(e.userId, includeInactive)),
    )
    const stores = await Promise.all(
      validated.map((e) =>
        this._storeModel.getById(e.storeId, includeInactive),
      ),
    )
    const dbResponses = [...users, ...stores]
    const allExist = dbResponses.every((e) => e)
    if (!allExist) {
      throw new CustomError(
        'Alguma loja ou colaborador não existem!',
        StatusCode.ClientErrorNotFound,
      )
    } else {
      const updatedData = await Promise.all(
        validated.map((e) => {
          const { userId, storeId, active } = e
          const data = this._model.createOrUpdateStoreSeller(
            userId,
            storeId,
            null,
            active,
          )
          return data
        }),
      )
      const domains = updatedData.map((e) =>
        DomainFactory.createDomain<StoreSeller>(this._domainName, e),
      )
      return domains
    }
  }
}

export default StoreSellerService
