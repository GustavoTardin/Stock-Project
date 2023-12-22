// import prisma from '../database/prisma'

import { Router } from 'express'
import StoreService from '../Services/StoreService'
import { storeModel } from '../Models'
import StoreController from '../Controllers/StoreController'
import { TokenValidation, UserValidation } from '../Middlewares'
import credentialGuard from '../Utils/credentialGuard'

const storeRouter = Router()
const storeService = new StoreService(storeModel)
const storeController = new StoreController(storeService)
const { tokenRequired } = TokenValidation
const { paramsIdRequired } = UserValidation

storeRouter.get(
  '/',
  tokenRequired(credentialGuard.highLevelAccess),
  storeController.getAll,
)

storeRouter.get(
  '/:id',
  tokenRequired(credentialGuard.freeAccess),
  paramsIdRequired,
  storeController.getById,
)

export default storeRouter
