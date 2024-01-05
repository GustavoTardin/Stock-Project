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
const { paramsIdRequired, activeRequired } = UserValidation
const { storeRequired, addressRequired } = StoreValidation

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

storeRouter.patch(
  '/:id/update-status',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  activeRequired,
  storeController.updateStatusById,
)

storeRouter.post(
  '/:id/add-address',
  tokenRequired(credentialGuard.highLevelAccess),
  paramsIdRequired,
  addressRequired,
  storeController.addAddress,
)

export default storeRouter
