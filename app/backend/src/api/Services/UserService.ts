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
  ISelfUpdate,
} from '../Contracts/interfaces/users'
import {
  ChangeStatusSchema,
  changePasswordSchema,
  completeUserSchema,
  loginSchema,
  selfUpdateUserSchema,
  updateCredentialSchema,
} from '../Contracts/zod/schemas/users'
import {
  generateAccessInfo,
  createUser,
  compareHash,
  hashAndUpdatePassword,
} from '../Utils/user'
import { User } from '../Domains'
import CustomError from '../Errors/CustomError'
import validateField from '../Utils/serviceValidation'
import { IStoreModel } from '../Contracts/interfaces/stores'
import prisma from '../database/prisma'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/storeSellers/IStoreSellerModel'
import { StatusCode } from 'status-code-enum'
import AbstractService from './AbstractService'
import DomainTypes from '../Utils/DomainTypes'

class UserService
  extends AbstractService<User, IDbUser, ICompleteUser, IUserModel>
  implements IUserService
{
  private _storeModel: IStoreModel
  private _storeSellerModel: IStoreSellerModel
  constructor(
    model: IUserModel,
    storeModel: IStoreModel,
    storeSellerModel: IStoreSellerModel,
  ) {
    super(model, DomainTypes.USER)
    this._storeModel = storeModel
    this._storeSellerModel = storeSellerModel
  }

  async getByNickName(nickName: unknown, query: unknown): Promise<User> {
    // valida se nickName é uma string; Se não, lança erro 400.
    const validatedNickName: string = validateField<string>(
      loginSchema.shape.nickName,
      nickName,
    )

    const includeInactive = query === 'true'
    const user = await this._model.getByNickName(
      validatedNickName,
      includeInactive,
    )
    if (!user) {
      throw new CustomError(
        `${this.domainName} não encontrado`,
        StatusCode.ClientErrorNotFound,
      )
    }
    const domain = new User(user)
    return domain
  }

  async getCredentials(): Promise<ICredential[]> {
    const credentials = await this._model.getCredentials()
    return credentials
  }

  async create(user: unknown): Promise<User> {
    // validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedUser: ICompleteUser = validateField<ICompleteUser>(
      completeUserSchema,
      user,
    )

    // Verifica se nickname já está em uso, se sim, retorna erro.
    const includeInactive = true
    const duplicatedUser = await this._model.getByNickName(
      validatedUser.nickName,
      includeInactive, // para incluir usuários desativados
    )
    if (duplicatedUser)
      throw new CustomError(
        'Esse nome de usuário já está em uso!',
        StatusCode.ClientErrorConflict,
      )

    // Cria usuário e caso ele faça parte de alguma loja, cria um registro na tabela auxiliar.
    // Também faz a validação se as lojas de fato existem, se não, lança erro e graças
    // a transaction, desfaz a criação do usuário, evitando inconsistências no database.
    const userId = await prisma.$transaction(async (tx): Promise<number> => {
      try {
        const userId = await createUser(
          validatedUser,
          this._model,
          this._storeModel,
          this._storeSellerModel,
          tx as ITransaction,
        )
        return userId
      } catch (error) {
        console.log(`Erro durante a criação de uma das entidades: ${error}`)
        throw error
      }
    })
    const newUser = (await this._model.getById(userId, false)) as IDbUser
    const domain = new User(newUser)
    return domain
  }

  async login(loginUser: unknown): Promise<ILoginResponse & IToken> {
    // Validação: Caso não tenha o formato correto, retorna erro 400.
    const validatedLogin = validateField<ILoginUser>(loginSchema, loginUser)

    // Verifica se nickname existe
    const includeInactive = false
    const showPassword = true
    const userFound = await this._model.getByNickName(
      validatedLogin.nickName,
      includeInactive, // Não incluir inativos
      showPassword, // incluir password
    )

    if (!userFound) {
      throw new CustomError(
        `${this.domainName} ou senha incorretos`,
        StatusCode.ClientErrorNotFound,
      )
    }

    // Verifica se a senha coincide
    const rightPassword = await compareHash(
      validatedLogin.password,
      userFound.password,
    )

    // Se a senha coincidir, gera token de acesso ao usuário; se não, retorna erro.
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
    const includeInactive = true
    const userToBeUpdated = await super.verifyIfExistsById(id, includeInactive)

    await prisma.$transaction(async (tx) => {
      try {
        await this._model.updateStatusById(id, active, tx as ITransaction)
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
    const updatedMessage = `${this.domainName} ${userToBeUpdated.firstName} ${
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

    const { id, currentPassword, newPassword } = changePasswordType
    // Verifica se senhas são iguais antes de chamar o database, aumentando performance em casos de erro
    if (currentPassword === newPassword)
      throw new CustomError(
        'As senhas devem ser diferentes!',
        StatusCode.ClientErrorBadRequest,
      )

    // verifica se o id existe, se não, lança erro.
    const includeInactive = false
    const showPassword = true
    const userToBeUpdated = await this._model.getById(
      id,
      includeInactive, // para não incluir inativos
      showPassword, // para mandar a senha antiga junto.
    )

    if (!userToBeUpdated) {
      throw new CustomError(
        `${this.domainName} não encontrado`,
        StatusCode.ClientErrorNotFound,
      )
    }
    // Verifica se a senha coincide
    const rightPassword = await compareHash(
      currentPassword,
      userToBeUpdated.password,
    )
    if (rightPassword) {
      // Faz o hash da senha, atualiza no database, e envia mensagem de sucesso
      return hashAndUpdatePassword(changePasswordType, this._model)
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
    const credential = await this._model.getCredentialById(ids.credentialId)
    if (!credential)
      throw new CustomError(
        'Cargo inexistente!',
        StatusCode.ClientErrorNotFound,
      )
    // Verifica se usuário existe, se não, lança erro 404.
    const includeInactive = false
    await super.verifyIfExistsById(ids.id, includeInactive)

    // Ambos existindo, atualiza credential do usuário, e retorna.
    const updatedUser = await this._model.updateUserCredential(ids)
    const domain = new User(updatedUser)
    return domain
  }

  async selfUpdateById(id: number, data: unknown): Promise<User> {
    // Valida se os campos estão corretos. Se não, retorna 400
    const validatedUser = validateField<ISelfUpdate>(selfUpdateUserSchema, data)

    // Verifica se usuário existe, se não, lança erro 404
    const includeInactive = false
    await super.verifyIfExistsById(id, includeInactive)

    if (validatedUser.nickName) {
      // Verifica se nickname já está em uso, se sim, retorna erro.
      const includeInactive = true
      const duplicatedUser = await this._model.getByNickName(
        validatedUser.nickName,
        includeInactive, // para incluir usuários desativados
      )
      if (duplicatedUser)
        throw new CustomError(
          'Esse nome de usuário já está em uso!',
          StatusCode.ClientErrorConflict,
        )
    }

    const updatedUser = await this._model.selfUpdateById(id, validatedUser)

    const domain = new User(updatedUser)
    return domain
  }
}

export default UserService
