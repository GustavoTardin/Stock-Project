import { IUser } from '.'

interface ICompleteUser extends IUser {
  firstName: string
  lastName: string | null
}

export default ICompleteUser
