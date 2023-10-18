export default class createName {
  constructor(
    readonly completo: string,
    readonly text: string,
    readonly min: number = 3,
    readonly max: number = 120,
  ) {
    if(!completo) throw new Error(`O ${text} é obrigatório`)
    if(min > max) throw new Error('Tamanho mínimo não deve ser maior que o máximo')
    if(completo.length > max) throw new Error(`O ${text} deve ter no máximo ${max} caracteres`)
    if(completo.length < min) throw new Error(`O ${text} deve ter no mínimo ${min} caracteres`)
  }
}
