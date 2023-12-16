import StoreSellerController from '../Controllers/StoreSellerController'
import StoreSellerModel from '../Models/StoreSellerModel'
import StoreSellerService from '../Services/StoreSellerService'
import prisma from '../database/prisma'
import { Router } from 'express'

const storeSellerRouter = Router()

const storeSellerModel = new StoreSellerModel(prisma)
const storeSellerService = new StoreSellerService(storeSellerModel)
const storeSellerController = new StoreSellerController(storeSellerService)

storeSellerRouter.post('/', storeSellerController.createOrUpdate)

export default storeSellerRouter

// const user = {
//   stores: [1, 2, 3],
//   id: 9,
//   firstName: 'tardin',
//   lastName: null,
//   credentialName: 'Lojista',
//   active: true,
// }

// const b = user.stores.map((e) => ({ userId: user.id, storeId: e }))

// const teste = { userId: user.id, storeId: 4, active: false }
