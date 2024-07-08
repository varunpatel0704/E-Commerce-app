import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const signUp = asyncHandler(async function (req, res, next) {
  // get user credentials from request body
  const { email, password } = req.body;

  // make sure required details are provided in the request
  if (!email || !password)
    return next(new ApiError(400, "All fields are mandatory"));

  // throw error if user has already signed up
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
    .json(new ApiResponse(201, "Sign up successful", {role:savedUser.role, accessToken}));
});

const login = asyncHandler(async function (req, res, next) {
  // get user credentials
  const { email, phoneNumber, password } = req.body;
  if ((!email && !phoneNumber) || !password)
    // either email or phone number has to be provided, along with the password ofc
    return next(new ApiError(400, "All fields are mandatory"));

  // fetch user
  const existingUser = await User.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (!existingUser) return next(new ApiError(404, "User not found"));

  // validate password
  const isPassValid = await existingUser.validatePassword(password);
  if (!isPassValid) return next(new ApiError(401, "Invalid password"));

  // issue jwt tokens
  const accessToken = existingUser.generateAccessToken();
  const refreshToken = existingUser.generateRefreshToken();

  // save the token in db
  existingUser.refreshToken = refreshToken;
  const savedUser = await existingUser.save();

  // send the tokens in res object
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, "Logged In", {role:savedUser.role, accessToken}));
});

const logout = asyncHandler(async function (req, res, next) {
  // user already authenticated, we have access to the _id

  // const user = await User.findById(req._id);
  // user.refreshToken = "";

  // await user.save();

  //alternate way
  await User.findByIdAndUpdate(req._id, { $set: { refreshToken: "" } });

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, "Logged Out"));
});

const refreshAccessToken = asyncHandler(async function (req, res, next) {
  // to refresh the accessToken, we need to verify the refreshToken.
  const incomingRefToken = req.cookies?.refreshToken;
  if (!incomingRefToken) return next(new ApiError(401, "refreshToken missing"));

  const decodedToken = jwt.verify(
    incomingRefToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);
  if (incomingRefToken !== user.refreshToken)
    return next(new ApiError(401, "invalid refreshToken"));

  // refreshToken verified, issue new accessToken
  const accessToken = user.generateAccessToken();

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, "accessToken refreshed", accessToken));
});

export { signUp, login, logout, refreshAccessToken };
