import { PrismaClient } from '@prisma/client'
import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
import IStoreSellerModel from '../Contracts/interfaces/models/IStoreSellerModel'
import { IStoreSeller } from '../Contracts/interfaces/storeSellers/IDbStoreSeller'
import prisma from '../database/prisma'

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
  async createOrUpdateStoreSeller(
    userId: number,
    storeId: number,
    transaction: ITransaction | null = null,
    active: boolean = true,
  ): Promise<IStoreSeller> {
    const createdSellers = await (transaction || this._db).storeSellers.upsert({
      where: { userId_storeId: { userId, storeId } },
      create: {
        userId,
        storeId,
      },
      update: { active },
    })

    return [createdSellers]
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
    return [storeSellers]
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
    return [storeSellers]
  }

  /**
   * Exclui vendedores de lojas por ID de usuário.
   * @param userId - ID do usuário.
   * @param transaction - Transação (opcional).
   */
  async updateBySellerId(
    userId: number,
    active: boolean,
    transaction: ITransaction | null = null,
  ): Promise<void> {
    await (transaction || this._db).storeSellers.updateMany({
      where: { userId },
      data: { active },
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

const storeSellerModel = new StoreSellerModel(prisma)

export default storeSellerModel
