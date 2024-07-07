import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import asyncHandler from "../utils/asyncHandler.js";

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
    .json(new ApiResponse(201, "Sign up successful", accessToken));
});

const login = asyncHandler(async function (req, res, next) {
  // get user credentials
  const { email, phoneNumber, password } = req.body;
  if ((!email && !phoneNumber) || !password) // either email or phone number has to be provided, along with the password ofc
    return next(new ApiError(400, "All fields are mandatory"));

  // fetch user
  const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (!existingUser) return next(new ApiError(404, "User not found"));

  // validate password
  const isPassValid = await existingUser.validatePassword(password);
  if (!isPassValid) return next(new ApiError(401, "Invalid password"));

  // issue jwt tokens
  const accessToken = existingUser.generateAccessToken();
  const refreshToken = existingUser.generateRefreshToken();

  // save the token in db
  existingUser.refreshToken = refreshToken;
  await existingUser.save();

  // send the tokens in res object
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, "Login successful", accessToken));
});

const logout = asyncHandler(async function(req, res, next){
  
});

export { signUp, login };
