import { Role } from '@prisma/client'

const credentials = [
  {
    id: 1,
    credentialName: Role.Root,
  },
  {
    id: 2,
    credentialName: Role.Admin,
  },
  {
    id: 3,
    credentialName: Role.Lojista,
  },
  {
    id: 4,
    credentialName: Role.Estoquista,
  },
]

export default credentials
