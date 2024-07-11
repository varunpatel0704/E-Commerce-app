import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signUp,
  getAllUsers,
  getUser,
  deleteUser
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.route("/signUp").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/refresh-accessToken").get(refreshAccessToken);

userRouter.route("/all").get(getAllUsers);
userRouter.route("/:id")
.get(getUser)
.delete(deleteUser);

export default userRouter;
