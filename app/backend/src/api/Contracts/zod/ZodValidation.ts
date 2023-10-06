import { z } from 'zod';
import CustomError from '../../Errors/CustomError';

class ZodValidation<T> {
  private _schema: z.ZodType<T>;

  constructor(schema: z.ZodType<T>) {
    this._schema = schema;
  }

  validateData(data: unknown) {
    try {
      this._schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        throw new CustomError(firstError.message, '400');
      } else {
        throw error;
      }
    }
  }
}

export default ZodValidation;
