import Joi from 'joi';

const validCredentialOptions = ['Lojista', 'Estoquista', 'Administrador'];

const userSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
  credential: Joi.string().valid(...validCredentialOptions).required(),
  stores: Joi.array().items(Joi.string()),
});

export default userSchema;