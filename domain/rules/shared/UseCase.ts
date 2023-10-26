export default interface UseCase<E, S> {
  executar(entrada: E): Promise<S>
}