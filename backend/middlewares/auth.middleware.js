const jwt = require("jsonwebtoken");
const constant = require("../constants");
module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  //console.log("test", token);

  if (!token) {
    return res.status(401).json({
      message: "not authenticated",
    });
  }
  const user = jwt.verify(token, constant.JWT_SECRET);
  if (user) {
    req.authData = { _id: user._id, email: user.email };
    next();
  } else {
    res.status(401).json({
      message: "not authenticated",
    });
  }
};
