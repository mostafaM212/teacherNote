const multer = require("multer");
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};
//multer storage we call disk storage here to configure how
//multer store things destination=> callback(error , path) path that file will store in
//filename=> callback(error , filename)
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime Type");
    if (isValid) {
      callback(null, "backend/images/users");
    } else {
      callback(error, "backend/images/users");
    }
  },
  filename: (req, file, callback) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
}).single("image");
