import * as bcrypt from 'bcrypt';

const users = [
  {
    firstName: 'root',
    lastName: 'dev',
    nickName: 'root',
    password: bcrypt.hashSync('1234', 10),
    role: 'ROOT',    
  },
  {
    firstName: 'Gustavo',
    lastName: 'Tardin',
    nickName: 'admin',
    password: bcrypt.hashSync('1234', 10),
    role: 'ADMIN',    
  },
  {
    firstName: 'Guilherme',
    lastName: 'Tardin',
    nickName: 'lojista',
    password: bcrypt.hashSync('1234', 10),
    role: 'LOJISTA',
  },
  {
    firstName: 'Richard',
    lastName: 'Machado',
    nickName: 'estoquista',
    password: bcrypt.hashSync('1234', 10),
    role: 'ESTOQUISTA',
  },
];

export default users;