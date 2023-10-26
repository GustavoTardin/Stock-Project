import User from "../model/User";

export default interface RepositorioCurso {
  salvar(curso: User): Promise<void> 
  buscarTodos(): Promise<User[]> 
  create(): Promise<User> 
}