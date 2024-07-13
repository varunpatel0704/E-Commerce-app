import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.class.js";

const requireAuth = asyncHandler(async function (req, res, next) {
  // get the accessToken from cookies or headers
  const accessToken =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
    
  if (!accessToken) return next(new ApiError(401, "accessToken missing"));

  // now decode the token to get user id payload encoded while signing it
  // const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function(err, decodedToken){
    if(err){
      return next(new ApiError(401, 'jwt token error'));
    }
    else{
      req.user = decodedToken;
      return next();
    }
  })

  // req.user = decodedToken; // user field contains _id, email and role.
  // return next();
});

const requireAdmin = asyncHandler(async function(req, res, next){
  // simply verify if the user has admin previlages.
  const role = req.user.role;
  if(role !== 'admin') return next(new ApiError(401, 'Unauthorized, admin role required'));

  return next();
})

export {requireAuth, requireAdmin};
