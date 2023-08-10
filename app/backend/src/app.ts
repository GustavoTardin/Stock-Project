import express from 'express';
import ErrorHandler from './api/Errors/ErrorHandler';
import userRouter from './api/Routes/userRouter';

const app = express();
app.use(express.json());
app.use('/user', userRouter);
app.get('/teste', (req, res) => res.status(200).send('oiii'));

app.use(ErrorHandler.handle);

export default app;