import 'dotenv';
import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/users/IToken';

class Jwt {
  private static _mySecret = process.env.JWT_SECRET as string;
  private static _jwtConfig: jwt.SignOptions = {
    expiresIn: '2d',
    algorithm: 'HS256',
  };

  static generateToken(payload: IToken): string {
    const token = jwt.sign(payload, this._mySecret, this._jwtConfig);
    return token;
  }

  static decryptToken = (token: string): IToken => {
    const decryptedData = jwt.verify(token, this._mySecret);
    return decryptedData as IToken;
  };
}

export default Jwt;