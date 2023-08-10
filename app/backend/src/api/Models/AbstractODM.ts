import {
  Model,
  models,
  Schema,
  model,
  Document,
} from 'mongoose';
import CustomError from '../Errors/CustomError';

abstract class AbstractODM<T extends Document> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async getAll(): Promise<T[]> {
    try {
      return await this.model.find();
    } catch {
      throw new CustomError('Sorry, some error happened on our server :(', '500');
    }
  }
}

export default AbstractODM;
