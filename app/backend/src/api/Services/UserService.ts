import UserODM from '../Models/UserODM';
import JoiValidation from '../Utils/JoiValidation';
import loginSchema from '../Utils/JoiSchemas/loginSchema';

class UserService {
  protected model: UserODM;
  protected joi: JoiValidation;

  constructor(ODM: UserODM) {
    const joi = new JoiValidation(loginSchema);
    this.model = ODM;
    this.joi = joi;
  }

  async checkLogin(credentials: unknown): Promise<string | Error> {
    this.joi.validateData(credentials);
    const validatedCredentials = credentials as { userName: string, password: string };
    const token = await 
    this.model.checkLogin(validatedCredentials.userName, validatedCredentials.password);
    return token;
  }
}

export default UserService;