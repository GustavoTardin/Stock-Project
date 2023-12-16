import { Role } from '@prisma/client'
import IDbUser from '../Contracts/interfaces/users/IDbUser'
class User {
  protected id: number
  protected nickName: string
  protected firstName: string
  protected lastName: string | null
  protected credentialName: string
  protected active: boolean
  protected stores: number[] | undefined = undefined

  constructor(user: IDbUser) {
    this.id = user.id
    this.nickName = user.nickName
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.credentialName = user.credential.credentialName
    this.active = user.active
    if (this.credentialName === Role.Lojista) {
      this.stores = user.stores.map((e) => e.storeId)
    }
  }
}

export default User
