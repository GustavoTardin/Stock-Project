interface ILoginResponse {
  token: string,
  credential: string,
  expiresIn: number
}

export default ILoginResponse;