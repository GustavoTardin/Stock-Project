import { Role } from '@prisma/client'

interface IDbUser {
  id: number
  firstName: string
  lastName: string | null
  nickName: string
  credential: {
    credentialName: Role
  }
}

export default IDbUser
