import Jwt from '../../Auth/Jwt'
import {
  IDbUser,
  ILoginResponse,
  IToken,
} from '../../Contracts/interfaces/users'

function generateAccessInfo(user: IDbUser): ILoginResponse & IToken {
  const userInfo = {
    id: user.id,
    firstName: user.firstName,
    credentialName: user.credential.credentialName,
  }
  const token = Jwt.generateToken(userInfo)
  const loginResponse = { ...userInfo, ...token }
  return loginResponse
}

export default generateAccessInfo
