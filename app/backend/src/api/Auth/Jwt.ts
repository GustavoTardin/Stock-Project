import 'dotenv'
import * as jwt from 'jsonwebtoken'
import IToken from '../Contracts/interfaces/users/IToken'
import { ILoginResponse } from '../Contracts/interfaces/users'

class Jwt {
  private static _mySecret = process.env.JWT_SECRET as string
  private static _jwtConfig: jwt.SignOptions = {
    expiresIn: '12h',
    algorithm: 'HS256',
  }

  static generateToken(payload: ILoginResponse): IToken {
    const token = jwt.sign(payload, this._mySecret, this._jwtConfig)
    const expirationInMinutes = 10.08 // 10.080 minutos é equivalente à 12 horas
    return { token, expiresIn: expirationInMinutes }
  }

  static decryptToken = (token: string): ILoginResponse => {
    const decryptedData = jwt.verify(token, this._mySecret) as jwt.JwtPayload
    return decryptedData as ILoginResponse
  }
}

export default Jwt
