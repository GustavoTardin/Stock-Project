import { PrismaClient, Prisma } from '@prisma/client'
// import { hashPassword } from '../Utils/hashPassword'
import {
  ICompleteUser,
  ICredential,
  IDbUser,
  IUserModel,
} from '../Contracts/interfaces/users'
import { hashPassword } from '../Utils/user/hashPassword'
import { DefaultArgs } from '@prisma/client/runtime/library'

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

  async createUser(
    user: ICompleteUser,
    tx: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$transaction'
    >,
  ): Promise<IDbUser> {
    const newUser = await tx.user.create({
      data: {
        ...user,
        password: hashPassword(user.password),
        stores: undefined,
      },
      select: this._includeCredential,
    })
    return newUser
  }
}

export default UserModel
