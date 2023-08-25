import { Document } from 'mongoose';
import AbstractODM from '../Models/AbstractODM';

abstract class AbstractService<DocumentType extends Document,
 ODMType extends AbstractODM<DocumentType>> {
  protected odm: ODMType;
  constructor(odm: ODMType) {
    this.odm = odm;
  }

  async getAll(): Promise<DocumentType[]> {
    const data = await this.odm.getAll();
    return data;
  }
}

export default AbstractService;