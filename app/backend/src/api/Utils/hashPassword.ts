import bcrypt from 'bcrypt'

const saltRounds = 10

export function hashPassword(pass: string) {
  return bcrypt.hashSync(pass, saltRounds)
}

export async function CompareHash(
  hashPassed: string,
  dbPassword: string,
): Promise<boolean> {
  return bcrypt.compare(hashPassed, dbPassword)
}
