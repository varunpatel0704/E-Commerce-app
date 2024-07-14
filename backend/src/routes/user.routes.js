import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signUp,
  getAllUsers,
  getUser,
  deleteUser,
  createUser
} from "../controllers/user.controllers.js";
import { requireAuth, requireAdmin } from "../middlewares/requireAuth.middleware.js";
import cloudUpload from "../middlewares/cloudUpload.middleware.js";
import {multiUpload } from "../middlewares/fileUpload.middleware.js";

const userRouter = Router();

userRouter.route("/signUp").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/refresh-accessToken").get(refreshAccessToken);

userRouter.route("/all").get(getAllUsers);
userRouter.route('/create').post(requireAuth, requireAdmin, multiUpload('avatar'), cloudUpload, createUser);
userRouter.route("/:id")
.get(getUser)
.patch(multiUpload('avatar'), cloudUpload)
.delete(requireAuth, requireAdmin, deleteUser);

export default userRouter;
