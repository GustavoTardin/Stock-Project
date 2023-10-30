import { Role } from '@prisma/client'

const credentialGuard = {
  admin: [Role.Admin],
  freeAccess: Object.values(Role),
}

export default credentialGuard
