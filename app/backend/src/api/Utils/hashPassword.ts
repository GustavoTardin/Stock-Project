import bcrypt from 'bcrypt'

const saltRounds = 10

interface compareHashProps {
  pass: string
  passCrypted: string
}
export function hashPassword(pass: string) {
  return bcrypt.hashSync(pass, saltRounds)
}

export async function CompareHash(props: compareHashProps): Promise<boolean> {
  return bcrypt.compare(props.pass, props.passCrypted)
}
