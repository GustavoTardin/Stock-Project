interface ILoginResponse {
  token: string,
  credentialName: string,
  expiresIn: number
  id: string,
}

export default ILoginResponse;
