import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  
  filename: function(req, file, cb){  
    const randomSuffix = uuidv4();
    const extension = file?.originalname.split('.').pop();

    cb(null, `${randomSuffix}.${extension}`);
  }
})

const fileUpload = multer({storage});
const singleUpload = (fieldname='image') => fileUpload.single(fieldname)
const multiUpload = (fieldname='images', maxCount=12) => fileUpload.array(fieldname, maxCount)

export {fileUpload, singleUpload, multiUpload};