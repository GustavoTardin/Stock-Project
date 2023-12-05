import { IChangePassword, IUserModel } from '../../Contracts/interfaces/users'
import { hashPassword } from './hashPassword'

const hashAndUpdatePassword = async (
  userToBeUpdated: IChangePassword,
  userModel: IUserModel,
): Promise<string> => {
  const hashedPassword = hashPassword(userToBeUpdated.newPassword)
  userToBeUpdated.newPassword = hashedPassword
  await userModel.updatePassword(userToBeUpdated)
  return 'Sua senha foi alterada com sucesso!'
}

export default hashAndUpdatePassword
