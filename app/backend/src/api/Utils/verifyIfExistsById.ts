import StatusCode from 'status-code-enum'
import IModel from '../Contracts/interfaces/models/IModel'
import CustomError from '../Errors/CustomError'

const verifyIfExistsById = async <T>(
  model: IModel<T>,
  id: number,
  includeInactive: boolean,
  objectName: string,
) => {
  const obj = await model.getById(id, includeInactive)
  if (!obj) {
    throw new CustomError(
      `${objectName} não existe`,
      StatusCode.ClientErrorNotFound,
    )
  } else {
    return obj
  }
}

export default verifyIfExistsById
