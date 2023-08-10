import 'dotenv';
import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/users/IToken';

class Jwt {
  private static _mySecret = process.env.JWT_SECRET as string;
  private static _jwtConfig: jwt.SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static generateToken(payload: IToken): string {
    const token = jwt.sign(payload, this._mySecret, this._jwtConfig);
    return token;
  }
}

export default Jwt;