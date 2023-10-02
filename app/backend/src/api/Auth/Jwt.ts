import 'dotenv';
import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/users/IToken';

class Jwt {
  private static _mySecret = process.env.JWT_SECRET as string;
  private static _jwtConfig: jwt.SignOptions = {
    expiresIn: '12h',
    algorithm: 'HS256',
  };

  static generateToken(payload: IToken) {
    const token = jwt.sign(payload, this._mySecret, this._jwtConfig);
    const expirationInMinutes = 720; // 720 minutos é equivalente à 12 horas
    return { token, expiresIn: expirationInMinutes };
  }

  static decryptToken = (token: string): IToken => {
    const decryptedData = jwt.verify(token, this._mySecret) as jwt.JwtPayload;
    return decryptedData as IToken;
  };
}

export default Jwt;