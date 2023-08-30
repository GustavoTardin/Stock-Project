import Joi from 'joi';

const newStoreSchema = Joi.object({
  name: Joi.string().min(4).required(),
  logoPath: Joi.string().allow(null),
});

export default newStoreSchema;