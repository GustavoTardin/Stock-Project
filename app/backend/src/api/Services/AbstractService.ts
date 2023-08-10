import { Document } from 'mongoose';
import AbstractODM from '../Models/AbstractODM';

abstract class AbstractService<T extends Document, G extends AbstractODM<T>> {
  protected odm: G;
  constructor(odm: G) {
    this.odm = odm;
  }

  async getAll(): Promise<T[]> {
    const data = await this.odm.getAll();
    return data;
  }
}

export default AbstractService;