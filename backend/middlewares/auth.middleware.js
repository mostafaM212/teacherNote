const jwt = require("jsonwebtoken");
const constant = require("../constants");
const httpStatus = require("http-status");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log("test", token);

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      message: "not authenticated",
    });
  }

  return jwt.verify(token, constant.JWT_SECRET, (err, decode) => {
    // console.log("test err", err);

    if (err !== null) {
      // console.log("test err 2", err);

      if (err == jwt.TokenExpiredError) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "invalid  token",
        });
      }
      if (err == jwt.JsonWebTokenError) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "not authenticated",
        });
      }
    }
    if (decode) {
      req.authData = { _id: decode._id, email: decode.email };
      next();
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "not authenticated",
      });
    }
  });
  // console.log("test", user);
};
