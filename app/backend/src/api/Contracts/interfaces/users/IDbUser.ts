import { ICredential, IUser } from '.'

interface IDbUser extends IUser {
  firstName: string
  lastName: string | null
  credential: ICredential
  stores: { storeId: number }[]
}

export default IDbUser
