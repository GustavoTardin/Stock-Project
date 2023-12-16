type TCompleteName ={
  firstName: string,
  lastName: string,
}

type TMinAndMax = {
  min?: number,
  max?: number,
}
type createNameProps = TCompleteName & TMinAndMax
export default function createName(name: createNameProps): void {
  const max = name.max || 120
  const min = name.min || 3
  if(!name.firstName) throw new Error(`O primeiro nome é obrigatório`)
  if(!name.lastName) throw new Error(`O sobrenome é obrigatório`)
  if(min > max) throw new Error('Tamanho mínimo não deve ser maior que o máximo')
  if(name.firstName.length > max) throw new Error(`O primeiro nome deve ter no máximo ${max} caracteres`)
  if(name.lastName.length > max) throw new Error(`O sobrenome deve ter no máximo ${max} caracteres`)
  if(name.lastName.length < min) throw new Error(`O o sobrenome deve ter no mínimo ${min} caracteres`)
  if(name.firstName.length < min) throw new Error(`O o primeiro nome deve ter no mínimo ${min} caracteres`)
}
