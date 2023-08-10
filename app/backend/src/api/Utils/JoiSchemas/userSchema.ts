import Joi from 'joi';

const validCredentialOptions = ['Lojista', 'Estoquista', 'Administrador'];

const userSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
  credential: Joi.string().valid(...validCredentialOptions).required(),
  store: Joi.array().items(Joi.string()).required(),
});

export default userSchema;