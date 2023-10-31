import { PrismaClient } from '@prisma/client'
import { User } from '../Domains'
import IUserModel from '../Contracts/interfaces/users/IUserModel'

class UserModel implements IUserModel {
  private _db: PrismaClient
  private _selectUser = {
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

  async getAll(): Promise<User[]> {
    const users = await this._db.user.findMany({
      select: this._selectUser,
    })

    const domains = users.map((user) => new User(user))
    return domains
  }

  async getByNickName(nickName: string): Promise<User> {
    const user = await this._db.user.findUniqueOrThrow({
      where: { nickName },
      select: this._selectUser,
    })
    const domain = new User(user)
    return domain
  }
}

export default UserModel
