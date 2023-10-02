import {
  Model,
  models,
  Schema,
  model,
  Document,
  isValidObjectId,
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

  public async deleteById(id: string): Promise<string> {
    if (!isValidObjectId(id)) throw new CustomError('Id inválido', '422');

    const deletedDocument = await this.model.findByIdAndDelete(id);
    if (!deletedDocument) throw new CustomError(`${this.modelName} não existe no sistema`, '404');
    return `${this.modelName} deletado(a) com sucesso`;
  }
}

export default AbstractODM;
