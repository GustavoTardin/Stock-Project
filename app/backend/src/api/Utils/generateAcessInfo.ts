import Jwt from '../Auth/Jwt'
import { IDbUser, ILoginResponse, IToken } from '../Contracts/interfaces/users'

function generateAcessInfo(user: IDbUser): ILoginResponse & IToken {
  const userInfo = {
    id: user.id,
    firstName: user.firstName,
    credentialName: user.credential.credentialName,
  }
  const token = Jwt.generateToken(userInfo)
  const loginResponse = { ...userInfo, ...token }
  return loginResponse
}

export default generateAcessInfo
