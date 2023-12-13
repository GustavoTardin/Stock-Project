import StatusCode from 'status-code-enum'
import ITransaction from '../../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../../Contracts/interfaces/storeSellers/IStoreSellerModel'
import { IStoreModel } from '../../Contracts/interfaces/stores'
import {
  ICompleteUser,
  IDbUser,
  IUserModel,
} from '../../Contracts/interfaces/users'
import CustomError from '../../Errors/CustomError'
import { hashPassword } from './hashPassword'

async function createUser(
  user: ICompleteUser,
  userModel: IUserModel,
  storeModel: IStoreModel,
  storeSellerModel: IStoreSellerModel,
  tx: ITransaction,
): Promise<IDbUser> {
  const hashedPassword = hashPassword(user.password)
  user.password = hashedPassword
  const createdUser = await userModel.createUser(user, tx as ITransaction)

  if (user.stores) {
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
          storeSellerModel.createStoreSeller(createdUser.id, storeId, tx),
        ),
      )
    }
  }
  return createdUser
}

export default createUser
