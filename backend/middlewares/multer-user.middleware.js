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
      callback(null, "backend/images/teachers");
    } else {
      callback(error, "backend/images/teachers");
    }
  },
  filename: (req, file, callback) => {
    const newName = file.originalname.toLowerCase().split(".")[0];
    const name = newName.split(" ").join("-");
    const extension = MIME_TYPE_MAP[file.mimetype];
    callback(null, name + "-" + Date.now() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
}).single("photo");
