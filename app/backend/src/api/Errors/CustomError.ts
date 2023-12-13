class CustomError extends Error {
  constructor(mess: string, statusCode: number) {
    super(mess)
    this.stack = statusCode.toString()
  }
}

export default CustomError
