interface IService<T, dbRes> {
  domainName: string
  getAll(query: unknown): Promise<T[]>
  getById(id: number, query: unknown): Promise<T>
  verifyIfExistsById(id: number, includeInactive: boolean): Promise<dbRes>
  create(data: unknown): Promise<T>
  updateStatusById(id: number, active: unknown): Promise<string>
}

export default IService
