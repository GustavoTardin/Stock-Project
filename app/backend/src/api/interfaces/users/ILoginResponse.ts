interface ILoginResponse {
  id: string,
  token: string,
  credential: string,
  expiresIn: number
}

export default ILoginResponse;