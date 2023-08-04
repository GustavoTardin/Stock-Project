import Joi from 'joi';

const loginSchema = Joi.object({
  userName: Joi.string().min(3),
  password: Joi.string().min(4),
});

export default loginSchema;