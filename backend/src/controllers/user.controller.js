import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  secure: true
};

const userSignUp = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;

  // get the mandatory detials => email, password
  if (!email || !password) return next(new ApiError(400, "All fields are mandatory"));
  
  console.log(email, password);

  //check for existing user.
  // const res = User.exists({$or: [{email}, {phoneNumber}]});

  const existingUser = await User.exists({ email });
  if (existingUser) next(new ApiError(400, "User already exists"));

  //register the user and return refresh, access tokens
  const newUser = await User.create({
    email,
    password,
  });

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  newUser.refreshToken = refreshToken;

  await newUser.save();
  
  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, 'User sign up successful', accessToken));
});

export {userSignUp};