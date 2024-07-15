import { Router } from "express";
import {
  login,
  logout,
  refreshAccessToken,
  signUp,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
} from "../controllers/user.controllers.js";
import {
  requireAuth,
  requireAdmin,
} from "../middlewares/requireAuth.middleware.js";
import cloudUpload from "../middlewares/cloudUpload.middleware.js";
import { multiUpload } from "../middlewares/fileUpload.middleware.js";
import ApiResponse from "../utils/ApiResponse.class.js";

const userRouter = Router();

userRouter.route("/signUp").post(signUp);
userRouter.route("/login").post(login);
userRouter.route("/logout").post(logout);
userRouter.route("/refresh-accessToken").get(refreshAccessToken);

userRouter.route("/all").get(requireAuth, requireAdmin, getAllUsers);
userRouter
  .route("/create")
  .post(
    requireAuth,
    requireAdmin,
    multiUpload("avatar"),
    cloudUpload,
    createUser
  );
userRouter.route("/delete/:id").delete(requireAuth, deleteUser, logout);
userRouter
  .route("/:id")
  .get(requireAuth, getUser)
  .patch(requireAuth, multiUpload("avatar"), cloudUpload, updateUser)
  .delete(requireAuth, requireAdmin, deleteUser, (req, res, next) => {
    return res.status(200).json(new ApiResponse(200, "User deleted"));
  });

export default userRouter;
