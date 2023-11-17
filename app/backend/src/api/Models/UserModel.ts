import { PrismaClient } from '@prisma/client'
// import { hashPassword } from '../Utils/hashPassword'
import {
  ICredential,
  IDbUser,
  IUserModel,
  // ICompleteUser,
} from '../Contracts/interfaces/users'

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
    login: boolean = false,
  ): Promise<IDbUser | null> {
    if (login) this._includeCredential.password = true
    const user = await this._db.user.findUnique({
      where: { nickName },
      select: this._includeCredential,
    })
    return user
  }

  // async createUser(user: ICompleteUser): Promise<IDbUser> {
  //   const newUser = await this._db.user.create({
  //     data: { ...user, password: hashPassword(user.password) },
  //     select: this._includeCredential,
  //   })
  //   return newUser
  // }
}

export default UserModel
