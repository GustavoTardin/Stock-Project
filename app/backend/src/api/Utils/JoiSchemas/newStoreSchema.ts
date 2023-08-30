import Joi from 'joi';

const newStoreSchema = Joi.object({
  name: Joi.string().min(4).required(),
  sellers: Joi.array().items(Joi.string()),
  logoPath: Joi.string().allow(null),
});

export default newStoreSchema;