import {
  IUserService,
  IUserModel,
  // ICompleteUser,
  ILoginResponse,
  IToken,
  ILoginUser,
  ICompleteUser,
  IDbUser,
} from '../Contracts/interfaces/users'
import { completeUserSchema, loginSchema } from '../Contracts/zod/schemas/users'
import { User } from '../Domains'
import CustomError from '../Errors/CustomError'
import generateAccessInfo from '../Utils/user/generateAccessInfo'
import { CompareHash } from '../Utils/user/hashPassword'
import validateField from '../Utils/serviceValidation'
import { IStoreModel } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'

class UserService implements IUserService {
  private _userModel: IUserModel
  private _storeModel: IStoreModel

  constructor(userModel: IUserModel, storeModel: IStoreModel) {
    this._userModel = userModel
    this._storeModel = storeModel
  }

  async getAll(): Promise<User[]> {
    const users = await this._userModel.getAll()
    const domains = users.map((user) => new User(user))
    return domains
  }

  async getByNickName(nickName: string): Promise<User> {
    const user = await this._userModel.getByNickName(nickName)
    if (!user) throw new CustomError('Usuário não encontrado', '404')
    const domain = new User(user)
    return domain
  }

  async createUser(user: unknown): Promise<User> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedUser: ICompleteUser = validateField<ICompleteUser>(
      completeUserSchema,
      user,
    )

    // Verifica se nickname já está em uso, se sim, retorna erro.
    const duplicatedUser = await this._userModel.getByNickName(
      validatedUser.nickName,
    )
    if (duplicatedUser)
      throw new CustomError('Nome de usuário já existe!!', '409')

    let allIdsExist = false
    if (validatedUser.stores) {
      allIdsExist = await this._storeModel.checkIds(validatedUser.stores)
    }

    const newUser = await prisma.$transaction(async (tx): Promise<IDbUser> => {
      try {
        const createdUser = await this._userModel.createUser(
          validatedUser,
          tx as ITransaction,
        )

        if (validatedUser.stores && !allIdsExist) {
          throw new CustomError('1 ou mais lojas não existem!', '404')
        } else {
          await this._storeModel.createStoreSellers(
            createdUser.id,
            validatedUser.stores as number[],
            tx as ITransaction,
          )
        }

        return createdUser
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    const domain = new User(newUser)
    return domain
  }

  async login(loginUser: unknown): Promise<ILoginResponse & IToken> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedLogin = validateField<ILoginUser>(loginSchema, loginUser)

    // verifica se nickname existe
    const userFound = await this._userModel.getByNickName(
      validatedLogin.nickName,
      true,
    )
    if (!userFound)
      throw new CustomError('Nome de usuário ou senha incorretos', '401')

    // verifica se a senha coincide
    const rightPassword = await CompareHash(
      validatedLogin.password,
      userFound.password,
    )
    if (rightPassword) {
      return generateAccessInfo(userFound)
    } else {
      throw new CustomError('Nome de usuário ou senha incorretos', '401')
    }
  }
}

export default UserService
