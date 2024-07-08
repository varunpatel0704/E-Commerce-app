import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.middleware.js'
import { signUp, login, logout, refreshAccessToken } from './controllers/user.controller.js';
import requireAuth from './middlewares/requireAuth.middleware.js';

const app = express();

app.use(cors({
  origin : process.env.CORS_ORIGIN,
  credentials : true
}))
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '100kb'}));
app.use(cookieParser());

app.post('/api/v1/users/signUp', signUp);
app.post('/api/v1/users/login', login);
app.post('/api/v1/users/logout',requireAuth, logout);
app.get('/api/v1/users/refresh-accessToken', refreshAccessToken);

app.use(errorHandler);


export default app;