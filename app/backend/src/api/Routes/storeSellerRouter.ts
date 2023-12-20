import StoreSellerController from '../Controllers/StoreSellerController'
import StoreSellerService from '../Services/StoreSellerService'
import { Router } from 'express'
import { storeModel, userModel, storeSellerModel } from '../Models'
import { UserValidation } from '../Middlewares'

const storeSellerRouter = Router()

const storeSellerService = new StoreSellerService(
  storeSellerModel,
  userModel,
  storeModel,
)
const storeSellerController = new StoreSellerController(storeSellerService)
const { storeSellersRequired } = UserValidation

storeSellerRouter.post(
  '/',
  storeSellersRequired,
  storeSellerController.createOrUpdate,
)

export default storeSellerRouter
