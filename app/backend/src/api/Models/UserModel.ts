import { PrismaClient } from '@prisma/client'
import IUserModel from '../Contracts/interfaces/users/IUserModel'
import ICompleteUser from '../Contracts/interfaces/users/ICompleteUser'
import { hashPassword } from '../Utils/hashPassword'
import IDbUser from '../Contracts/interfaces/users/IDbUser'

class UserModel implements IUserModel {
  private _db: PrismaClient
  private _includeCredential = {
    id: true,
    firstName: true,
    lastName: true,
    nickName: true,
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

  async getAll(): Promise<IDbUser[]> {
    const users = await this._db.user.findMany({
      select: this._includeCredential,
    })

    return users
  }

  async getByNickName(nickName: string): Promise<IDbUser | null> {
    const user = await this._db.user.findUnique({
      where: { nickName },
      select: this._includeCredential,
    })

    return user
  }

  async createUser(user: ICompleteUser): Promise<IDbUser> {
    const newUser = await this._db.user.create({
      data: { ...user, password: hashPassword(user.password) },
      select: this._includeCredential,
    })
    return newUser
  }
}

export default UserModel
