import bcrypt from 'bcrypt'

const saltRounds = 10

export function hashPassword(pass: string) {
  return bcrypt.hashSync(pass, saltRounds)
}

export async function compareHash(
  unhashedString: string,
  hashPassed: string,
): Promise<boolean> {
  return bcrypt.compare(unhashedString, hashPassed)
}
