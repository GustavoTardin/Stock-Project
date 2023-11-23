import { ISimpleStore } from '.'

interface IStoreModel {
  getAll(): Promise<ISimpleStore[]>
  findById(id: number): Promise<ISimpleStore | null>
}

export default IStoreModel
