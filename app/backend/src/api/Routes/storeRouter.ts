import { Router } from 'express';
import { StoreODM } from '../Models';
import StoreService from '../Services/StoreService';
import StoreController from '../Controllers/StoreController';
import upload from '../Uploads/multerConfig';
import { StoreValidation, TokenValidation } from '../Midllewares';

const storeRouter = Router();

const storeODM = new StoreODM();
const storeService = new StoreService(storeODM);
const storeController = new StoreController(storeService);

const { nameRequired } = StoreValidation;

storeRouter.get('/', storeController.getAll);
storeRouter.get('/names', storeController.getStoreNames);
storeRouter.post(
  '/create',
  TokenValidation.credentialRequired(),
  upload.single('storeLogo'),
  nameRequired,
  storeController.createStore,
);

export default storeRouter;