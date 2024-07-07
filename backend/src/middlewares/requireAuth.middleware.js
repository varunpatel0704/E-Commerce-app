import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import ApiError from "../utils/ApiError.class.js";

const requireAuth = asyncHandler(async function(req, res, next){

  // get the accessToken from cookies or headers
  const accessToken = req.cookies || req.header("Authorization")?.replace("Bearer ", "");
  if(!accessToken) return next(new ApiError(401,'accessToken missing'));

  // now decode the token to get user id payload encoded while signing it
  const decodedToken = jwt.verify()


});