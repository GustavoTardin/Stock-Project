import { ISimpleStore } from '.'

interface IStoreModel {
  getAll(): Promise<ISimpleStore[]>
  getById(id: number, includeInactive: boolean): Promise<ISimpleStore | null>
}

export default IStoreModel
