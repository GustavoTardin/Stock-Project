import { Role } from '@prisma/client'

const credentialGuard = {
  admin: [Role.Admin],
  highLevelAccess: [Role.Admin, Role.Root],
  freeAccess: Object.values(Role),
}

export default credentialGuard
