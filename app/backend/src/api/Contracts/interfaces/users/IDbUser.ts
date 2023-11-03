import { ICredential, IUser } from '.'

interface IDbUser extends IUser {
  firstName: string
  lastName: string | null
  credential: ICredential
}

export default IDbUser
