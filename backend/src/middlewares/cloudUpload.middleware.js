import { v2 as cloudinary } from "cloudinary";
import asyncHandler from "../utils/asyncHandler.js";
// import ApiError from "../utils/ApiError.class.js";
import { rm } from "fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const cloudinaryUpload = async (filePath) => {
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  try {
    if (!filePath)
      throw new Error("file path missing, required for cloudinary upload");

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      resource_type: "auto",
    };

    const result = await cloudinary.uploader.upload(filePath, options);    
    console.log(result);
    // remove file from the server after it is uploaded to cloud
    rm(filePath);

    return result;
    
  } catch (error) {
    rm(filePath);

    return error;
  }
};

export const cloudinaryDelete = async(publicIdArray)=>{
  try {
    const res = await cloudinary.api.delete_resources(publicIdArray)
    return res;
  } catch (error) { 
    throw new Error('could not delete asset from cloudinary');
  }
}

const cloudUpload = asyncHandler(async function(req, res, next){
  
  //extract the file path provided by multer
  const file = req.files?.[0];
  if(!file) return next();

  const filePath = file.path;

  console.log('file path: ', filePath);
  // upload and wait for result
  const uploadResult = await cloudinaryUpload(filePath);

  // add the asset url to the req.body object, we are uploading image in this case
  req.body.image = uploadResult.url;    
  
  return next();
});

export default cloudUpload;