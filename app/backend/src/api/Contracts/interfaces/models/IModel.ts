import ITransaction from '../prisma/ITransaction'

interface IModel<T, C> {
  getAll(includeInactive: boolean): Promise<T[]>
  getById(id: number, includeInactive: boolean): Promise<T | null>
  create(obj: C, tx: ITransaction): Promise<T>
  updateStatusById(id: number, active: boolean): Promise<T>
}

export default IModel
