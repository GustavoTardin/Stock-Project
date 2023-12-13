import {
  IUserService,
  IUserModel,
  ILoginResponse,
  IToken,
  ILoginUser,
  ICompleteUser,
  IDbUser,
  ICredential,
  IChangePassword,
  IChangeUserCredential,
  IChangeStatus,
} from '../Contracts/interfaces/users'
import {
  ChangeStatusSchema,
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
import hashAndUpdatePassword from '../Utils/user/hashAndUpdatePassword'
import { StatusCode } from 'status-code-enum'
import updateCredentialSchema from '../Contracts/zod/schemas/users/updateCredentialSchema'
import ISelfUpdate from '../Contracts/interfaces/users/updates/ISelfUpdate'
import selfUpdateUserSchema from '../Contracts/zod/schemas/users/selfUpdateUserSchema'
import verifyIfExistsById from '../Utils/verifyIfExistsById'

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

  async getAll(query: unknown): Promise<User[]> {
    const includeInactive = query === 'true'
    const users = await this._userModel.getAll(includeInactive)
    const domains = users.map((user) => new User(user))
    return domains
  }

  async getCredentials(): Promise<ICredential[]> {
    const credentials = await this._userModel.getCredentials()
    return credentials
  }

  async getByNickName(nickName: unknown, query: unknown): Promise<User> {
    const includeInactive = query === 'true'
    // valida se nickName é uma string; Se não, lança erro 400.
    const validatedNickName: string = validateField<string>(
      loginSchema.pick({ nickName: true }),
      nickName,
    )
    const user = await this._userModel.getByNickName(
      validatedNickName,
      includeInactive,
    )
    if (!user) {
      throw new CustomError(
        'Usuário não encontrado',
        StatusCode.ClientErrorNotFound,
      )
    }
    const domain = new User(user)
    return domain
  }

  async getById(id: number, query: unknown): Promise<User> {
    const includeInactive = query === 'true'
    // validação: Caso não exista, lança erro 404.
    const user = await verifyIfExistsById<IDbUser>(
      this._userModel,
      id,
      includeInactive,
      'Usuário',
    )
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
      true, // para incluir usuários desativados
    )
    if (duplicatedUser)
      throw new CustomError(
        'Nome de usuário já existe!!',
        StatusCode.ClientErrorConflict,
      )

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
    const userFound = await this._userModel.getByNickName(
      validatedLogin.nickName,
      false, // Não incluir inativos
      true, // incluir password
    )

    if (!userFound) {
      throw new CustomError(
        'Usuário ou senha incorretos',
        StatusCode.ClientErrorNotFound,
      )
    }

    // Verifica se a senha coincide
    const rightPassword = await CompareHash(
      validatedLogin.password,
      userFound.password,
    )

    // Se a senha coinscidir, gera token de acesso ao usuario; se não, retorna erro.
    if (rightPassword) {
      return generateAccessInfo(userFound)
    } else {
      throw new CustomError(
        'Nome de usuário ou senha incorretos',
        StatusCode.ClientErrorUnauthorized,
      )
    }
  }

  async updateStatusById(data: unknown): Promise<string> {
    // Valida formato, lança erro 400 se estiver incorreto.
    const { id, active } = validateField<IChangeStatus>(
      ChangeStatusSchema,
      data,
    )

    // Verifica se o id existe, se não, lança erro 404
    const userToBeUpdated = await verifyIfExistsById<IDbUser>(
      this._userModel,
      id,
      true,
      'Usuário',
    )

    await prisma.$transaction(async (tx) => {
      try {
        await this._userModel.updateStatusById(id, active, tx as ITransaction)
        await this._storeSellerModel.updateBySellerId(
          id,
          active,
          tx as ITransaction,
        )
      } catch (error) {
        console.log(`Erro durante a criação de uma das entidades: ${error}`)
        throw error
      }
    })
    const updatedMessage = `Usuário ${userToBeUpdated.firstName} ${
      active ? 'reativado' : 'desativado'
    } com sucesso`
    return updatedMessage
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
      throw new CustomError(
        'As senhas devem ser diferentes!',
        StatusCode.ClientErrorBadRequest,
      )

    // verifica se o id existe, se não, lança erro.
    const userToBeUpdated = await this._userModel.getById(
      id,
      false, // para não incluir inativos
      true, // para mandar a senha antiga junto.
    )

    if (!userToBeUpdated) {
      throw new CustomError(
        'Usuário não encontrado',
        StatusCode.ClientErrorNotFound,
      )
    }
    // Verifica se a senha coinscide
    const rightPassword = await CompareHash(password, userToBeUpdated.password)
    if (rightPassword) {
      // Faz o hash da senha e envia mensagem de sucesso
      return hashAndUpdatePassword(changePasswordType, this._userModel)
    } else {
      throw new CustomError(
        'Senha antiga incorreta!',
        StatusCode.ClientErrorUnauthorized,
      )
    }
  }

  async updateUserCredential(data: unknown): Promise<User> {
    // Valida se os campos estão corretos; se não, lança erro 400
    const ids = validateField<IChangeUserCredential>(
      updateCredentialSchema,
      data,
    )
    // Verifica se credential existe, se não, lança 404
    const credential = await this._userModel.getCredentialById(ids.credentialId)
    if (!credential)
      throw new CustomError(
        'Cargo inexistente!',
        StatusCode.ClientErrorNotFound,
      )
    // Verifica se usuário existe, se não, lança erro 404.
    await verifyIfExistsById(this._userModel, ids.id, false, 'usuário')

    // Ambos existindo, atualiza credential do usuário, e retorna.
    const updatedUser = await this._userModel.updateUserCredential(ids)
    const domain = new User(updatedUser)
    return domain
  }

  async selfUpdateById(id: number, data: unknown): Promise<User> {
    // Valida se os campos estão corretos. Se não, retorna 400
    const validatedUser = validateField<ISelfUpdate>(selfUpdateUserSchema, data)

    // Verifica se usuário existe, se não, lança erro 404
    await verifyIfExistsById(this._userModel, id, false, 'Usuário')

    const updatedUser = await this._userModel.selfUpdateById(id, validatedUser)

    const domain = new User(updatedUser)
    return domain
  }
}

export default UserService
