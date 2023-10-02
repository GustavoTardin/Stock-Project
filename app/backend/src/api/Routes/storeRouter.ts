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
const { tokenRequired } = TokenValidation; 

storeRouter.get('/', tokenRequired(), storeController.getAll);
storeRouter.get('/names', tokenRequired(), storeController.getStoreNames);
storeRouter.post(
  '/create',
  tokenRequired('Administrador'),
  upload.single('storeLogo'),
  nameRequired,
  storeController.createStore,
);

export default storeRouter;