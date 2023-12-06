import * as bcrypt from 'bcrypt'

const users = [
  {
    firstName: 'Richard',
    lastName: 'Machado',
    nickName: 'root',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 1,
  },
  {
    firstName: 'Gustavo',
    lastName: 'Tardin',
    nickName: 'admin',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 2,
  },
  {
    firstName: 'Guilherme',
    lastName: 'Tardin',
    nickName: 'lojista',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 3,
  },
  {
    firstName: 'Seu Joaquin',
    lastName: 'da Silva',
    nickName: 'estoquista',
    password: bcrypt.hashSync('1234', 10),
    credentialId: 4,
  },
]

export default users
