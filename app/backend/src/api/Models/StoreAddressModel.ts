// import { PrismaClient } from '@prisma/client'
// import { IStoreAddress, IUpdateAddress } from '../Contracts/interfaces/stores'
// import ITransaction from '../Contracts/interfaces/prisma/ITransaction'
// import prisma from '../database/prisma'
// import {
//   IStoreAddressModel,
//   IDbStoreAddress,
// } from '../Contracts/interfaces/storeAddress'

// class StoreAddressModel implements IStoreAddressModel {
//   private _db

//   constructor(db: PrismaClient) {
//     this._db = db
//   }

//   async create(
//     storeId: number,
//     address: IStoreAddress,
//     tx: ITransaction,
//   ): Promise<IDbStoreAddress> {
//     const newAddress = await (tx || this._db).storeAddress.create({
//       data: { storeId, ...address },
//     })
//     return newAddress
//   }

//   async updateByStoreId(
//     storeId: number,
//     updatedAddress: IUpdateAddress,
//     tx?: ITransaction,
//   ) {
//     await (tx || this._db).storeAddress.update({
//       where: { storeId },
//       data: updatedAddress,
//     })
//   }
// }

// const storeAddressModel = new StoreAddressModel(prisma)

// export default storeAddressModel
