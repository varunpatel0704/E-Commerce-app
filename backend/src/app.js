import express from 'express'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.middleware.js'
import { signUp, login, logout, refreshAccessToken } from './controllers/user.controller.js';
import requireAuth from './middlewares/requireAuth.middleware.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '100kb'}));
app.use(cookieParser());

app.post('/api/v1/user/signUp', signUp);
app.post('/api/v1/user/login', login);
app.post('/api/v1/user/logout',requireAuth, logout);
app.post('/api/v1/user/refresh-accessToken', refreshAccessToken);

app.use(errorHandler);


export default app;