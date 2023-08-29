import express from 'express';
import ErrorHandler from './api/Errors/ErrorHandler';
import { storeRouter, userRouter } from './api/Routes';

const accessControl: express.RequestHandler = (_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
  res.header('Access-Control-Allow-Headers', '*');
  next();
};

const app = express();
app.use(express.json());
app.use(accessControl);
app.use('/user', userRouter);
app.use('/stores', storeRouter);

app.use(ErrorHandler.handle);

export default app;