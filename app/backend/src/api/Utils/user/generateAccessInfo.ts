import Jwt from '../../Auth/Jwt'
import {
  IDbUser,
  ILoginResponse,
  IToken,
} from '../../Contracts/interfaces/users'

function generateAccessInfo(user: IDbUser): ILoginResponse & IToken {
  const {
    id,
    nickName,
    firstName,
    credential: { credentialName },
  } = user
  const userInfo = {
    id,
    nickName,
    firstName,
    credentialName,
  }
  const token = Jwt.generateToken(userInfo)
  const loginResponse = { ...userInfo, ...token }
  return loginResponse
}

export default generateAccessInfo
