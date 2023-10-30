import { PrismaClient } from '@prisma/client'
import ICompleteUser from '../Contracts/interfaces/users/ICompleteUser'

class UserModel {
  private _db: PrismaClient

  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  async getAll(): Promise<ICompleteUser[]> {
    const users = await this._db.user.findMany({
      select: {
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
      },
    })

    const domains = users.map((user) => ({
      ...user,
      credential: user.credential.credentialName,
    }))
    return domains
  }
}

export default UserModel
