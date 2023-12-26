// import prisma from '../database/prisma'

import { Router } from 'express'
import StoreService from '../Services/StoreService'
import { storeModel, storeSellerModel } from '../Models'
import StoreController from '../Controllers/StoreController'
import {
  StoreValidation,
  TokenValidation,
  UserValidation,
} from '../Middlewares'
import credentialGuard from '../Utils/credentialGuard'

const storeRouter = Router()
const storeService = new StoreService(storeModel, storeSellerModel)
const storeController = new StoreController(storeService)
const { tokenRequired } = TokenValidation
const { paramsIdRequired } = UserValidation
const { storeRequired } = StoreValidation

storeRouter.get(
  '/names',
  tokenRequired(credentialGuard.freeAccess),
  storeController.getNames,
)

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
  storeRequired,
  tokenRequired(credentialGuard.highLevelAccess),
  storeController.create,
)

storeRouter.patch(
  '/:id/update',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  storeController.updateById,
)

export default storeRouter
