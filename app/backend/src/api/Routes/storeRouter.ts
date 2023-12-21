// import prisma from '../database/prisma'

import { Router } from 'express'
import StoreService from '../Services/StoreService'
import { storeModel } from '../Models'
import StoreController from '../Controllers/StoreController'

const storeRouter = Router()
const storeService = new StoreService(storeModel)
const storeController = new StoreController(storeService)

storeRouter.get('/', storeController.getAll)

export default storeRouter
