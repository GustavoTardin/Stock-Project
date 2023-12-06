import { PrismaClient } from '@prisma/client'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/storeSellers/IStoreSellerModel'
import IStoreSeller from '../Contracts/interfaces/storeSellers/IStoreSeller'

class StoreSellerModel implements IStoreSellerModel {
  private _db: PrismaClient

  /**
   * Construtor da classe.
   * @param prisma - Instância do Prisma Client.
   */
  constructor(prisma: PrismaClient) {
    this._db = prisma
  }

  /**
   * Cria vendedores de lojas associados a um usuário.
   * @param userId - ID do usuário.
   * @param storeIds - IDs das lojas.
   * @param transaction - Transação (opcional).
   * @returns Uma lista dos vendedores de lojas criados.
   */
  async createStoreSeller(
    userId: number,
    storeId: number,
    transaction: ITransaction | null = null,
  ): Promise<IStoreSeller> {
    const createdSellers = await (transaction || this._db).storeSellers.create({
      data: {
        userId,
        storeId,
      },
    })

    return createdSellers
  }

  /**
   * Obtém vendedores de lojas por ID de usuário.
   * @param userId - ID do usuário.
   * @returns Uma lista de vendedores de lojas ou null se não encontrados.
   */
  async getBySellerId(userId: number): Promise<IStoreSeller[] | null> {
    const storeSellers = await this._db.storeSellers.findMany({
      where: { userId, active: true },
    })
    return storeSellers
  }

  /**
   * Obtém vendedores de lojas por ID de loja.
   * @param storeId - ID da loja.
   * @returns Uma lista de vendedores de lojas ou null se não encontrados.
   */
  async getByStoreId(storeId: number): Promise<IStoreSeller[] | null> {
    const storeSellers = await this._db.storeSellers.findMany({
      where: { storeId, active: true },
    })
    return storeSellers
  }

  /**
   * Exclui vendedores de lojas por ID de usuário.
   * @param userId - ID do usuário.
   * @param transaction - Transação (opcional).
   */
  async deleteBySellerId(
    userId: number,
    transaction: ITransaction | null = null,
  ): Promise<void> {
    await (transaction || this._db).storeSellers.updateMany({
      where: { userId },
      data: { active: false },
    })
  }

  /**
   * Exclui vendedores de lojas por ID de loja.
   * @param storeId - ID da loja.
   * @param transaction - Transação (opcional).
   */
  async deleteByStoreId(
    storeId: number,
    transaction: ITransaction | null = null,
  ): Promise<void> {
    await (transaction || this._db).storeSellers.updateMany({
      where: { storeId },
      data: { active: false },
    })
  }
}

export default StoreSellerModel
