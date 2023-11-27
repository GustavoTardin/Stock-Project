import {
  IUserService,
  IUserModel,
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
import { CompareHash, hashPassword } from '../Utils/user/hashPassword'
import validateField from '../Utils/serviceValidation'
import { IStoreModel } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import createUser from '../Utils/user/createUser'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/storeSellers/IStoreSellerModel'

class UserService implements IUserService {
  private _userModel: IUserModel
  private _storeModel: IStoreModel
  private _storeSellerModel: IStoreSellerModel
  constructor(
    userModel: IUserModel,
    storeModel: IStoreModel,
    storeSellerModel: IStoreSellerModel,
  ) {
    this._userModel = userModel
    this._storeModel = storeModel
    this._storeSellerModel = storeSellerModel
  }

  async getAll(): Promise<User[]> {
    const users = await this._userModel.getAll()
    const domains = users.map((user) => new User(user))
    return domains
  }

  async getByNickName(nickName: unknown): Promise<User> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    if (typeof nickName !== 'string') {
      throw new CustomError('Um nome de usuário deve ser passado', '400')
    }
    const user = await this._userModel.getByNickName(nickName as string)
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

    // Cria usuário e caso ele faça parte de alguma loja, cria um registro na tabela auxiliar.
    // Também faz a validação se as lojas de fato existem, se não, lança erro e graças
    // a transaction, desfaz a criação do usuário, evitando inconsistências no database.
    const newUser = await prisma.$transaction(async (tx): Promise<IDbUser> => {
      try {
        const createdUser = await createUser(
          validatedUser,
          this._userModel,
          this._storeModel,
          this._storeSellerModel,
          tx as ITransaction,
        )
        return createdUser
      } catch (error) {
        console.log(`Erro durante a criação de uma das entidades: ${error}`)
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

    // Se a senha coinscidir, gera token de acesso ao usuario; se não, retorna erro.
    if (rightPassword) {
      return generateAccessInfo(userFound)
    } else {
      throw new CustomError('Nome de usuário ou senha incorretos', '401')
    }
  }

  async deleteByNickName(nickName: unknown): Promise<string> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    if (typeof nickName !== 'string') {
      throw new CustomError('Um nome de usuário deve ser passado', '400')
    }

    // verifica se nickname existe
    const userToBeDeleted = await this._userModel.getByNickName(
      nickName as string,
    )
    if (!userToBeDeleted) {
      throw new CustomError('Usuário não existe', '404')
    } else {
      await this._userModel.deleteByNickName(nickName as string)
      // Se for deletado, retorna mensagem
      const deletedMessage = `Usuário ${nickName} deletado com sucesso`
      return deletedMessage
    }
  }

  async updatePassword(nickName: unknown, password: unknown): Promise<string> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedUser = validateField<ILoginUser>(loginSchema, {
      nickName,
      password,
    })
    // verifica se nickname existe
    const userToBeUpdated = await this._userModel.getByNickName(
      validatedUser.nickName,
    )
    if (!userToBeUpdated) {
      throw new CustomError('Usuário não existe', '404')
    } else {
      // Faz o hash da senha
      const hashedPassword = hashPassword(validatedUser.password)
      validatedUser.password = hashedPassword

      await this._userModel.updatePassword(validatedUser)
      return 'Sua senha foi alterada com sucesso!'
    }
  }
}

export default UserService
