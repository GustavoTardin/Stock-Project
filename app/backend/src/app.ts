// import express, { NextFunction, Request, Response } from 'express';
// import ErrorHandler from './api/Errors/ErrorHandler';
// import { storeRouter, userRouter, saleRouter } from './api/Routes';

// const accessControl: express.RequestHandler = (
//   _req: Request,
//   res: Response, 
//   next: NextFunction,
// ) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// };

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(accessControl);
// app.use('/user', userRouter);
// app.use('/stores', storeRouter);
// app.use('/sales', saleRouter);

// app.use(ErrorHandler.handle);

// export default app;