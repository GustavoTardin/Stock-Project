import Joi from 'joi';
import { messages } from 'joi-translation-pt-br';
import CustomError from '../../Errors/CustomError';

class JoiValidation {
  private _schema;

  constructor(schema: Joi.ObjectSchema<unknown>) {
    this._schema = schema;
  }

  validateData(data: unknown) {
    const { error } = this._schema.validate(data, { messages });
    if (error) throw new CustomError(error.message, '400');
  }
}

export default JoiValidation;
