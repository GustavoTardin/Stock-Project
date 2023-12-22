// import prisma from '../database/prisma'

import { Router } from 'express'
import StoreService from '../Services/StoreService'
import { storeAddressModel, storeModel } from '../Models'
import StoreController from '../Controllers/StoreController'
import { TokenValidation, UserValidation } from '../Middlewares'
import credentialGuard from '../Utils/credentialGuard'

const storeRouter = Router()
const storeService = new StoreService(storeModel, storeAddressModel)
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
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  storeController.getById,
)

storeRouter.post(
  '/create',
  tokenRequired(credentialGuard.highLevelAccess),
  storeController.create,
)

export default storeRouter
