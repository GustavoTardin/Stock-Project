import Id from "./Id";

export default abstract class Entity {
  readonly id: Id
  constructor(id: string) {
    this.id = new Id(id)
  }

  igual(entidade: Entity): boolean {
    return this.id.valor === entidade.id.valor
  }

  diferente(entidade: Entity): boolean {
    return !this.igual(entidade)
  }
}
