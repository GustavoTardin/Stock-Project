interface IService<T> {
  getAll(): Promise<T[]>
  create(data: T): Promise<T>;
  getById(id: string): Promise<T>;
  update(id: string, data: T): Promise<T>;
  delete(id: string): Promise<void>;
}

export default IService;