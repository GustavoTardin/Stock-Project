import { PrismaClient } from '@prisma/client'
// import { hashPassword } from '../Utils/hashPassword'
import {
  IChangePassword,
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

  async getAll(): Promise<IDbUser[]> {
    const users = await this._db.user.findMany({
      where: { active: true },
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
      where: { nickName },
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
      where: { id },
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

  async deleteById(id: number): Promise<void> {
    await this._db.user.delete({
      where: { id },
    })
  }

  async updatePassword({ id, newPassword }: IChangePassword): Promise<void> {
    await this._db.user.update({
      where: { id },
      data: { password: newPassword },
    })
  }
}

export default UserModel
