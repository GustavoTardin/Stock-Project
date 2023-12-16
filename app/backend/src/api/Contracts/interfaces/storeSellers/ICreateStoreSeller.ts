import IStoreSeller from './IDbStoreSeller'

interface ICreateOrUpdateStoreSeller
  extends Omit<IStoreSeller, 'createdAt' | 'updatedAt'> {}

export default ICreateOrUpdateStoreSeller
