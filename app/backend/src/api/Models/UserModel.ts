import { PrismaClient } from '@prisma/client'
// import { hashPassword } from '../Utils/hashPassword'
import {
  ICompleteUser,
  ICredential,
  IDbUser,
  ILoginUser,
  IUserModel,
} from '../Contracts/interfaces/users'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'

class UserModel implements IUserModel {
  private _db: PrismaClient
  private _includeCredential = {
    id: true,
    firstName: true,
    lastName: true,
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
      select: this._includeCredential,
    })

    return users
  }

  async getByNickName(
    nickName: string,
    login = false,
  ): Promise<IDbUser | null> {
    // Caso esse método seja chamado para fazer login, retorna
    // o password do usuário para checar se a senha enviada pela requisição
    // coinscide. Se o método não for chamado em operação de login(maioria das
    // vezes, por isso o padrão é false), o password é tirado da resposta.
    if (login) this._includeCredential.password = true

    const user = await this._db.user.findUnique({
      where: { nickName },
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

  async deleteByNickName(nickName: string): Promise<void> {
    await this._db.user.delete({
      where: { nickName },
    })
  }

  async updatePassword({ nickName, password }: ILoginUser): Promise<void> {
    await this._db.user.update({ where: { nickName }, data: { password } })
  }
}

export default UserModel
