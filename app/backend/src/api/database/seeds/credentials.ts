import { Role } from '@prisma/client'

const credentials = [
  {
    credentialName: Role.Root,
  },
  {
    credentialName: Role.Admin,
  },
  {
    credentialName: Role.Lojista,
  },
  {
    credentialName: Role.Estoquista,
  },
]

export default credentials
