import express from 'express'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.middleware.js'
import { signUp, login } from './controllers/user.controller.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '100kb'}));
app.use(cookieParser());

app.post('/api/v1/user/signUp', signUp);
app.post('/api/v1/user/login', login);

app.use(errorHandler);


export default app;