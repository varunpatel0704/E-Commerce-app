import jwt from "jsonwebtoken";
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
  const { fullName, email, password } = req.body;
  console.log('sign up request received ', email);

  // make sure required details are provided in the request
  if (!fullName || !email || !password)
    return next(new ApiError(400, "All fields are mandatory"));

  // throw error if user has already signed up
  const existingUser = await User.findOne({ email });
  if (existingUser) next(new ApiError(409, "User already exists"));

  //register the user and return refresh, access tokens
  const newUser = await User.create({
    fullName,
    email,
    password,
  });

  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  newUser.refreshToken = refreshToken;

  const savedUser = await newUser.save();

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(201, "Sign up successful", {
        role: savedUser.role,
        accessToken,
      })
    );
});

const login = asyncHandler(async function (req, res, next) {
  // get user credentials
  const { email, password } = req.body;
  console.log('login request received ', email);

  if(!email || !password)
    return next(new ApiError(400, "All fields are mandatory"));

  const existingUser = await User.findOne({email}); // use findOne instead of find since find will return an array.
  console.log(existingUser);
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
    .json(
      new ApiResponse(200, "Logged In", {fullName:savedUser.fullName, role: savedUser.role, accessToken })
    );
});

const logout = asyncHandler(async function (req, res, next) {
  // clear the tokens from cookies and from the db as well.
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) return res.sendStatus(204);

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (decoded) {
        await User.findOneAndUpdate(
          { email: decoded.email },
          { $set: { refreshToken: "" } }
        ); // we've put an index on the email field so this should be faster.
      } else if (err) {
        await User.findOneAndUpdate(
          { refreshToken },
          { $set: { refreshToken: "" } }
        );
      }
      return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "Logged Out"));
    }
  );
});

const refreshAccessToken = asyncHandler(async function (req, res, next) {
  // to refresh the accessToken, we need to verify the refreshToken.
  const incomingRefToken = req.cookies?.refreshToken;
  if (!incomingRefToken) return next(new ApiError(401, "refreshToken missing"));

  const decodedToken = jwt.verify(
    incomingRefToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.find({email: decodedToken.email});
  if (incomingRefToken !== user.refreshToken)
    return next(new ApiError(401, "invalid refreshToken"));

  // refreshToken verified, issue new accessToken
  const accessToken = user.generateAccessToken();

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(new ApiResponse(201, "accessToken refreshed", accessToken));
});

export { login, logout, refreshAccessToken, signUp };

