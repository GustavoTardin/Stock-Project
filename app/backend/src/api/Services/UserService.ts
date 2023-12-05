import {
  IUserService,
  IUserModel,
  ILoginResponse,
  IToken,
  ILoginUser,
  ICompleteUser,
  IDbUser,
} from '../Contracts/interfaces/users'
import {
  changePasswordSchema,
  completeUserSchema,
  loginSchema,
} from '../Contracts/zod/schemas/users'
import { User } from '../Domains'
import CustomError from '../Errors/CustomError'
import generateAccessInfo from '../Utils/user/generateAccessInfo'
import { CompareHash } from '../Utils/user/hashPassword'
import validateField from '../Utils/serviceValidation'
import { IStoreModel } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import createUser from '../Utils/user/createUser'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/storeSellers/IStoreSellerModel'
import IChangePassword from '../Contracts/interfaces/users/IChangePassword'
import verifyIfUserExists from '../Utils/user/verifyIfUserExists'
import hashAndUpdatePassword from '../Utils/user/hashAndUpdatePassword'

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
    const user = await verifyIfUserExists(this._userModel, nickName)
    const domain = new User(user)
    return domain
  }

  async getById(id: number): Promise<User> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const user = await verifyIfUserExists(this._userModel, id)
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
    // Validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedLogin = validateField<ILoginUser>(loginSchema, loginUser)

    // Verifica se nickname existe
    const userFound = await verifyIfUserExists(
      this._userModel,
      validatedLogin.nickName,
      true, // Para enviar a senha junto
    )

    // Verifica se a senha coincide
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

  async deleteById(id: number): Promise<string> {
    // verifica se o id existe, se não, lança erro 404.
    const userToBeDeleted = await verifyIfUserExists(this._userModel, id)

    await this._userModel.deleteById(id)
    // Se for deletado, retorna mensagem
    const deletedMessage = `Usuário ${userToBeDeleted.firstName} deletado com sucesso`
    return deletedMessage
  }

  async updatePassword(data: unknown): Promise<string> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const changePasswordType: IChangePassword = validateField<IChangePassword>(
      changePasswordSchema,
      data,
    )

    const { id, password, newPassword } = changePasswordType
    // Verifica se senhas são iguais antes de chamar o database, aumentando performance em casos de erro
    if (password === newPassword)
      throw new CustomError('As senhas devem ser diferentes!', '400')

    // verifica se o id existe, se não, lança erro.
    const userToBeUpdated = await verifyIfUserExists(this._userModel, id, true) // Esse true é para mandar a senha antiga junto.

    // Verifica se a senha coinscide
    const rightPassword = await CompareHash(password, userToBeUpdated.password)
    if (rightPassword) {
      // Faz o hash da senha e envia mensagem de sucesso
      return hashAndUpdatePassword(changePasswordType, this._userModel)
    } else {
      throw new CustomError('Senha antiga incorreta!', '401')
    }
  }
}

export default UserService
