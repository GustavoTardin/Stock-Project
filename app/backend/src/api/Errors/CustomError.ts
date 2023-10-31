class CustomError extends Error {
  constructor(mess: string, statusCode: string) {
    super(mess)
    this.stack = statusCode
  }
}

export default CustomError
