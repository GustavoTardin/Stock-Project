import bcrypt from 'bcrypt'

const saltRounds = 10

interface User {
  firstName: string
  lastName: string
  nickName: string
  password: string
  credentialId: number
}

export class HashedPassword {
  private password: string
  constructor(private user: User) {
    this.password = 'password'
  }

  async crypta() {
    this.password = bcrypt.hashSync(this.user.password, saltRounds)
    const a = { ...this.user, password: this.password }
    return a
  }
}
