import { PrismaClient } from '@prisma/client'
import {
  IChangePassword,
  IChangeUserCredential,
  ICompleteUser,
  ICredential,
  IDbUser,
  IUserModel,
} from '../Contracts/interfaces/users'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'

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
    showPassword = false,
  ): Promise<IDbUser | null> {
    // Quase nunca será necessário devolver o password(com hash) do usuário,
    // mas em alguns poucos casos(por isso o default é false), como em requisição
    // de login ou update de senha, é necessário a senha para comparações.
    if (showPassword) this._includeCredential.password = true

    const user = await this._db.user.findUnique({
      where: { nickName, active: true },
      select: this._includeCredential,
    })

    // Seta a exibição do password para false novamente.
    this._includeCredential.password = false
    return user
  }

  async getById(id: number, showPassword = false): Promise<IDbUser | null> {
    // Quase nunca será necessário devolver o password(com hash) do usuário,
    // mas em alguns poucos casos(por isso o default é false), como em requisição
    // de login ou update de senha, é necessário a senha para comparações.
    if (showPassword) this._includeCredential.password = true

    const user = await this._db.user.findUnique({
      where: { id, active: true },
      select: this._includeCredential,
    })

    // Seta a exibição do password para false novamente.
    this._includeCredential.password = false
    return user
  }

  async createUser(user: ICompleteUser, tx: ITransaction): Promise<IDbUser> {
    const newUser = await tx.user.create({
      data: {
        ...user,
        stores: undefined,
      },
      select: this._includeCredential,
    })
    return newUser
  }

  async deleteById(id: number, transaction: ITransaction): Promise<void> {
    await transaction.user.update({
      where: { id },
      data: { active: false },
    })
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
}

export default UserModel
