import { IDbUser, IUserModel } from '../../Contracts/interfaces/users'
import CustomError from '../../Errors/CustomError'

const verifyIfUserExists = async (
  userModel: IUserModel,
  field: unknown,
  showPassword = false,
): Promise<IDbUser> => {
  let user: IDbUser | null = null
  if (typeof field === 'number') {
    user = await userModel.getById(field, showPassword)
  } else if (typeof field === 'string') {
    user = await userModel.getByNickName(field, showPassword)
  }
  if (!user) throw new CustomError('Usuário não encontrado', '404')
  return user
}

export default verifyIfUserExists
