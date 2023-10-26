import Credential from "../../shared/Credential";
import Entity from "../../shared/Entity";
import StoreName from "../../shared/StoreName";
import UserName from "../../shared/UserName";


export interface UserProps {
  id?: string
  userName?: string
  credential?: string;
  storeName?: string;
}

export default class User extends Entity{
  readonly userName: UserName
  readonly credential: Credential
  readonly storeName: StoreName

  constructor(props: UserProps) {
    super(props.id!)
    this.userName = new UserName(
      props.userName!, 'nome', 4, 70)
    this.storeName = new StoreName(
      props.storeName!, 'nome da loja', 4, 50)
    this.credential = new Credential(
      props.credential!, 'password', 7, 20)
  }
}
