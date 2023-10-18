import createName from "./CreateName"

export default class UserName extends createName {
  partial(qtde: number): string {
    return this.completo.substring(0, qtde) ?? ""
  }

}
