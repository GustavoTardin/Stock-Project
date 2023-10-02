interface ILoginResponse {
  token: string,
  credential: string,
  expiresIn: number
  id: string,
}

export default ILoginResponse;
