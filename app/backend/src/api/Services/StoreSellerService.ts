import z from 'zod'
import IStoreSellerModel from '../Contracts/interfaces/models/IStoreSellerModel'
import storeSellerSchema from '../Contracts/zod/schemas/storeSellers/storeSellerSchema'
import { StoreSeller } from '../Domains'
import DomainTypes from '../Utils/DomainTypes'
import validateField from '../Utils/serviceValidation'
import DomainFactory from '../Utils/DomainFactory'
import IStoreSellerService from '../Contracts/interfaces/services/IStoreSellerService'

class StoreSellerService implements IStoreSellerService {
  private _model: IStoreSellerModel
  private _domainName = DomainTypes.StoreSellers
  constructor(model: IStoreSellerModel) {
    this._model = model
  }

  async createOrUpdateStoreSeller(data: unknown): Promise<StoreSeller[]> {
    console.log(data)
    const validated = validateField<z.infer<typeof storeSellerSchema>>(
      storeSellerSchema,
      data,
    )
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

export default StoreSellerService
