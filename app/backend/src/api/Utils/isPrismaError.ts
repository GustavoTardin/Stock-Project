import { Prisma } from '@prisma/client'

// Defina um array com as classes de erro do Prisma
const classesDeErroDoPrisma = [
  Prisma.PrismaClientKnownRequestError,
  Prisma.PrismaClientUnknownRequestError,
  Prisma.PrismaClientRustPanicError,
  Prisma.PrismaClientInitializationError,
  Prisma.PrismaClientValidationError,
]

// Função para verificar se um erro é uma instância de qualquer uma das classes do array
function isPrismaError(error: unknown): boolean {
  return classesDeErroDoPrisma.some((classe) => error instanceof classe)
}

export default isPrismaError
