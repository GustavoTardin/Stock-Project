import IDbUser from '../Contracts/interfaces/users/IDbUser'
class User {
  protected id: number
  protected nickName: string
  protected firstName: string
  protected lastName: string | null
  protected credential: string

  constructor(user: IDbUser) {
    this.id = user.id
    this.nickName = user.nickName
    this.firstName = user.firstName
    this.lastName = user.lastName
    this.credential = user.credential.credentialName
  }
}

export default User
