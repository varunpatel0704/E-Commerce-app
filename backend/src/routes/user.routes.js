import { Router } from "express";
import { login, logout, refreshAccessToken, signUp } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route('/signUp').post(signUp);
userRouter.route('/login').post(login);
userRouter.route('/logout').post(logout);
userRouter.route('/refresh-accessToken').get(refreshAccessToken);

export default userRouter;