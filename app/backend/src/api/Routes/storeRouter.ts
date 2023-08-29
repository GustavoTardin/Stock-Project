import { Router } from 'express';
import { StoreODM } from '../Models';
import StoreService from '../Services/StoreService';
import StoreController from '../Controllers/StoreController';
import upload from '../Uploads/multerConfig';
import StoreValidation from '../MIdllewares/StoreValidation';

const storeRouter = Router();

const storeODM = new StoreODM();
const storeService = new StoreService(storeODM);
const storeController = new StoreController(storeService);

const { nameRequired, sellersRequired } = StoreValidation;

storeRouter.get('/', storeController.getAll);
storeRouter.get('/names', storeController.getStoreNames);
storeRouter.post(
  '/create',
  upload.single('storeLogo'),
  nameRequired,
  sellersRequired,
  storeController.createStore,
);

export default storeRouter;