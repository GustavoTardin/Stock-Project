import { PrismaClient } from '@prisma/client'
import {
  IChangePassword,
  IChangeUserCredential,
  ICompleteUser,
  ICredential,
  IDbUser,
  INames,
  IUserModel,
} from '../Contracts/interfaces/users'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import ISelfUpdate from '../Contracts/interfaces/users/updates/ISelfUpdate'
import prisma from '../database/prisma'
import CredentialIds from '../database/seeds/CredentialIds'

class UserModel implements IUserModel {
  private _db: PrismaClient
  private _includeCredential = {
    id: true,
    firstName: true,
    lastName: true,
    active: true,
    nickName: false,
    password: false,
    credential: {
      select: {
        credentialName: true,
      },
    },
    stores: { select: { storeId: true }, where: { active: true } },
  }

  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getCredentials(): Promise<ICredential[]> {
    return this._db.credential.findMany()
  }

  async getCredentialById(id: number): Promise<ICredential | null> {
    const credential = await this._db.credential.findUnique({ where: { id } })
    return credential
  }

  async getAll(includeInactive: boolean): Promise<IDbUser[]> {
    const users = await this._db.user.findMany({
      where: includeInactive ? undefined : { active: true },
      select: this._includeCredential,
    })

    return users
  }

  async getByNickName(
    nickName: string,
    includeInactive: boolean,
    showPassword = false,
  ): Promise<IDbUser | null> {
    // Quase nunca será necessário devolver o password(com hash) do usuário,
    // mas em alguns poucos casos(por isso o default é false), como em requisição
    // de login ou update de senha, é necessário a senha para comparações.
    const select = { ...this._includeCredential, password: showPassword }

    const user = await this._db.user.findUnique({
      where: includeInactive ? { nickName } : { nickName, active: true },
      select,
    })

    // Seta a exibição do password para false novamente.
    return user
  }

  async getById(
    id: number,
    includeInactive: boolean,
    showPassword = false,
  ): Promise<IDbUser | null> {
    // Quase nunca será necessário devolver o password(com hash) do usuário,
    // mas em alguns poucos casos(por isso o default é false), como em requisição
    // de login ou update de senha, é necessário a senha para comparações.
    const select = { ...this._includeCredential, password: showPassword }

    const user = await this._db.user.findUnique({
      where: includeInactive ? { id } : { id, active: true },
      select,
    })
    return user
  }

  async create(user: ICompleteUser, tx: ITransaction): Promise<IDbUser> {
    const newUser = await tx.user.create({
      data: {
        ...user,
        stores: undefined,
      },
      select: this._includeCredential,
    })
    return newUser
  }

  async updatePassword({ id, newPassword }: IChangePassword): Promise<void> {
    await this._db.user.update({
      where: { id },
      data: { password: newPassword },
    })
  }

  async updateUserCredential({
    id,
    credentialId,
  }: IChangeUserCredential): Promise<IDbUser> {
    const updatedUser = await this._db.user.update({
      where: { id },
      data: { credentialId },
      select: this._includeCredential,
    })
    return updatedUser
  }

  async updateStatusById(
    id: number,
    active: boolean,
    transaction?: ITransaction,
  ): Promise<IDbUser> {
    const isSeller = id === CredentialIds.Lojista
    const updatedUser = await (transaction || this._db).user.update({
      where: { id },
      data: {
        active,
        stores:
          isSeller && !active
            ? {
                updateMany: {
                  where: { userId: id },
                  data: { active },
                },
              }
            : undefined,
      },
      select: this._includeCredential,
    })
    return updatedUser
  }

  async selfUpdateById(id: number, data: ISelfUpdate): Promise<IDbUser> {
    const updatedUser = await this._db.user.update({
      where: { id },
      data,
      select: this._includeCredential,
    })
    return updatedUser
  }

  async getUserNamesById(id: number): Promise<INames | null> {
    const user = await this._db.user.findUnique({
      where: { id },
      select: { id: true, nickName: true, firstName: true, lastName: true },
    })
    return user
  }
}

const userModel = new UserModel(prisma)

export default userModel
