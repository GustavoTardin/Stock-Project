import { Role } from '@prisma/client'

const credentialGuard = {
  admin: [Role.Admin],
}

export default credentialGuard
