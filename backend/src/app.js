import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.middleware.js'
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();

app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '100kb'}));
app.use(cookieParser());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

app.use(errorHandler);


export default app;