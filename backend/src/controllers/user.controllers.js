import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.class.js";
import ApiResponse from "../utils/ApiResponse.class.js";
import asyncHandler from "../utils/asyncHandler.js";
import { cloudinaryDelete } from "../middlewares/cloudUpload.middleware.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
};

const signUp = asyncHandler(async function (req, res, next) {
  // get user credentials from request body
  const { fullName, email, password } = req.body;
  console.log("sign up request received ", email);

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
  // refactor and try to use new User() instead.
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
  console.log("login request received ", email);

  if (!email || !password)
    return next(new ApiError(400, "All fields are mandatory"));

  const existingUser = await User.findOne({ email }); // use findOne instead of find since find will return an array.
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
      new ApiResponse(200, "Logged In", {
        fullName: savedUser.fullName,
        role: savedUser.role,
        accessToken,
      })
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

  console.log("incoming refreshToken: ", incomingRefToken);

  const decodedToken = jwt.verify(
    incomingRefToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findOne({ email: decodedToken.email });

  console.log("user db ref token: ", user);
  if (incomingRefToken !== user.refreshToken)
    return next(new ApiError(401, "invalid refreshToken"));

  // refreshToken verified, issue new accessToken
  const accessToken = user.generateAccessToken();

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(201, "accessToken refreshed", {
        accessToken,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      })
    );
});

const getAllUsers = asyncHandler(async function (req, res, next) {
  // simply return all the users.
  const users = await User.find({}).select("-password -refreshToken");

  if (!users.length) return next(new ApiResponse(404, "No users found"));

  return res
    .status(200)
    .json(new ApiResponse(200, "Fetched users list", users));
});

const getUser = asyncHandler(async function (req, res, next) {
  const { id } = req.params || req.body;
  const emailRegex = /^\S+@\S+\.\S+$/; // checks if string is of format 'example@provider.domain'
  const isEmail = emailRegex.test(id);

  let user;
  if (isEmail)
    user = await User.findOne({ email: id }).select("-password -refreshToken");
  else user = await User.findById(id).select("-password -refreshToken");

  if (!user) return next(new ApiError(404, "User not found"));

  return res.status(200).json(new ApiResponse(200, "User fetched", user));
});

const deleteUser = asyncHandler(async function (req, res, next) {
  const { id } = req.params || req.body;
  const emailRegex = /^\S+@\S+\.\S+$/; // checks if string is of format 'example@provider.domain'
  const isEmail = emailRegex.test(id);
  console.log('delete request for', id);
  
  let user;
  if (isEmail){
    console.log('finding user by email...');
    user = await User.findOne({ email: id });
  }
  else{
    console.log('finding use by _id');
    user = await User.findOne({ _id: id });
  }
  console.log(user);

  if (!user) return next(new ApiError(404, "User not found"));
  console.log(user);

  if(user.avatar){
    const imageUrl = user.avatar;
    const fileName = imageUrl.split("/").pop();
    const publicId = fileName.slice(0, fileName.indexOf("."));
    cloudinaryDelete([publicId]); //delete uploaded image from cloudinary
  }  
  console.log('deleting user...');
  await user.deleteOne();

  return next();
});

const createUser = asyncHandler(async function (req, res, next) {
  // get user credentials from request body
  const { fullName, email, password, role, phoneNumber, image } = req.body;
  console.log('create request for', req.body);
  // make sure required details are provided in the request
  if (!fullName || !email || !password || !role)
    return next(new ApiError(400, "All fields are mandatory"));

  // throw error if user has already signed up
  const existingUser = await User.findOne({ email });
  if (existingUser) next(new ApiError(409, "User already exists"));

  //register the user and return refresh, access tokens
  const newUser = await User.create({
    fullName,
    email,
    password,
    role,
  });
  if (image) newUser.avatar = image;
  if (phoneNumber) newUser.phoneNumber = phoneNumber;

  await newUser.save();

  return res.status(201).json(
    new ApiResponse(201, "User added", {
      fullName,
      email,
      role,
      phoneNumber,
      image,
    })
  );
});

const updateUser = asyncHandler(async function (req, res, next) {
  const { id } = req.params;
  console.log('user update request received for', id);
  const {
    fullName,
    email,
    password,
    role,
    phoneNumber,
    image,
    shippingAddress,
  } = req.body;

  const user = await User.findOne({ email: id });
  if (!user) return next(new ApiError("user not found"));

  if (fullName) {
    user.fullName = fullName;
  }
  if (email) {
    const existingUser = await User.exists({email});
    if(existingUser)  return next( new ApiError(409, 'Email is already under use'));
    user.email = email;

    // issue new refresh and accessTokens if the email was changed
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    res
      .cookie("accessToken", accessToken, cookieOptions)
      .cookie("refreshToken", refreshToken, cookieOptions);
  }
  if (password) {
    user.password = password;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (image) {
    //delete existing image if any before overwriting.
    if(user.avatar){
      const imageUrl = user.avatar;
      const fileName = imageUrl.split('/').pop();
      const publicId = fileName.slice(0, fileName.indexOf('.'));
      cloudinaryDelete([publicId]);
    }

    user.avatar = image;
  }
  if (shippingAddress) {    
    user.shippingAddress = shippingAddress;
  }
  if (role && req.user.role === "admin") {
    user.role = role;
  }

  const savedUser = await user.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, "Details updated", {
        email: savedUser.email,
        fullName: savedUser.fullName,
        phoneNumber: savedUser.phoneNumber,
        shippingAddress: savedUser.shippingAddress,
        avatar: savedUser.avatar,
      })
    );
});

export {
  login,
  logout,
  refreshAccessToken,
  signUp,
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
};
