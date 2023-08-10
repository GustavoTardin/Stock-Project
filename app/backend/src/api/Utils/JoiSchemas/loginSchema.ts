import Joi from 'joi';

const loginSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  password: Joi.string().min(4).required(),
});

export default loginSchema;