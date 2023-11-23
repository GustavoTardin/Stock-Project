import ITransaction from '../../Contracts/interfaces/prisma/ITransaction'
import { IStoreModel } from '../../Contracts/interfaces/stores'
import {
  ICompleteUser,
  IDbUser,
  IUserModel,
} from '../../Contracts/interfaces/users'
import CustomError from '../../Errors/CustomError'

async function createUser(
  user: ICompleteUser,
  userModel: IUserModel,
  storeModel: IStoreModel,
  tx: ITransaction,
): Promise<IDbUser> {
  const createdUser = await userModel.createUser(user, tx as ITransaction)

  if (user.stores) {
    const allIdsExist = await storeModel.checkIds(user.stores)
    if (!allIdsExist) {
      throw new CustomError('1 ou mais lojas não existem!', '404')
    } else {
      await storeModel.createStoreSellers(
        createdUser.id,
        user.stores as number[],
        tx as ITransaction,
      )
    }
  }
  return createdUser
}

export default createUser
