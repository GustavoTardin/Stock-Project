import StatusCode from 'status-code-enum'
import ITransaction from '../../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../../Contracts/interfaces/models/IStoreSellerModel'
import { IStoreModel } from '../../Contracts/interfaces/stores'
import { ICompleteUser, IUserModel } from '../../Contracts/interfaces/users'
import CustomError from '../../Errors/CustomError'
import { hashPassword } from './hashPassword'
import CredentialIds from '../../database/seeds/CredentialIds'

async function createUser(
  user: ICompleteUser,
  userModel: IUserModel,
  storeModel: IStoreModel,
  storeSellerModel: IStoreSellerModel,
  tx: ITransaction,
): Promise<number> {
  const hashedPassword = hashPassword(user.password)
  user.password = hashedPassword
  const { id } = await userModel.create(user, tx as ITransaction)

  if (user.stores.length > 0) {
    if (user.credentialId !== CredentialIds.Lojista) {
      throw new CustomError(
        'Apenas colaboradores de cargo Lojista podem ser vinculados à lojas',
        StatusCode.ClientErrorBadRequest,
      )
    }
    const stores = await Promise.all(
      user.stores.map((id) => storeModel.findById(id)),
    )
    const allIdsExist = stores.every((e) => e !== null)
    if (!allIdsExist) {
      throw new CustomError(
        '1 ou mais lojas não existem!',
        StatusCode.ClientErrorNotFound,
      )
    } else {
      await Promise.all(
        user.stores.map((storeId) =>
          storeSellerModel. createOrUpdateStoreSeller(id, storeId, tx),
        ),
      )
    }
  }
  return id
}

export default createUser
