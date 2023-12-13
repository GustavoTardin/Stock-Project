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
import ISelfUpdate from '../Contracts/interfaces/users/updates/ISelfUpdate'
class UserModel implements IUserModel {
  public db: PrismaClient
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
    this.db = prisma
  }

  async getCredentials(): Promise<ICredential[]> {
    return this.db.credential.findMany()
  }

  async getCredentialById(id: number): Promise<ICredential | null> {
    const credential = await this.db.credential.findUnique({ where: { id } })
    return credential
  }

  async getAll(includeInactive: boolean): Promise<IDbUser[]> {
    const users = await this.db.user.findMany({
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

    const user = await this.db.user.findUnique({
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

    const user = await this.db.user.findUnique({
      where: includeInactive ? { id } : { id, active: true },
      select,
    })
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

  async updatePassword({ id, newPassword }: IChangePassword): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: { password: newPassword },
    })
  }

  async updateUserCredential({
    id,
    credentialId,
  }: IChangeUserCredential): Promise<IDbUser> {
    const updatedUser = await this.db.user.update({
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
  ): Promise<void> {
    await (transaction || this.db).user.update({
      where: { id },
      data: { active },
    })
  }

  async selfUpdateById(id: number, data: ISelfUpdate): Promise<IDbUser> {
    const updatedUser = await this.db.user.update({
      where: { id },
      data,
      select: this._includeCredential,
    })
    return updatedUser
  }
}

export default UserModel
