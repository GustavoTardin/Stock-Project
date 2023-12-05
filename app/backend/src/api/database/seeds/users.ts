import * as bcrypt from 'bcrypt'

const users = [
  {
    id: 1,
    firstName: 'Richard',
    lastName: 'Machado',
    nickName: 'root',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 1,
  },
  {
    id: 2,
    firstName: 'Gustavo',
    lastName: 'Tardin',
    nickName: 'admin',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 2,
  },
  {
    id: 3,
    firstName: 'Guilherme',
    lastName: 'Tardin',
    nickName: 'lojista',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 3,
  },
  {
    id: 4,
    firstName: 'Seu Joaquin',
    lastName: 'da Silva',
    nickName: 'estoquista',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 4,
  },
]

export default users
