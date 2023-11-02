const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const constant = require("../constants");
const { validationResult } = require("express-validator");

exports.getUsers = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};

exports.getUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};
exports.addUser = async (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    res.json(errors);
  }
  const url = req.protocol + "://" + req.get("host");
  await User.findOne({ email: req.body.email }).then((data) => {
    // console.log("test", data);

    if (data) {
      return res.status(400).json({
        message: "This Email is already in use",
      });
    }
    bcrypt.hash(req.body.password, 10).then((hashedPass) => {
      User.count()
        .then((numOfDocuments) => {
          const user = new User({
            email: req.body.email,
            password: hashedPass,
            phone: req.body.phone,
            name: req.body.name,
            type: numOfDocuments === 0 ? "Admin" : "Teacher",
            photo: url + "/images/teachers/" + req.file.filename,
          });
          user.save().then((e) => {
            return res.status(200).json({
              message: "user inserted successfully",
              user: user,
            });
          });
        })
        .catch((e) => {
          return res.status(400).json({
            message: "This Email is already in use",
          });
        });
    });
    // console.log("test", userCount);
  });
};
exports.updateUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};
exports.deleteUser = (req, res, next) => {
  return res.status(200).json({
    message: "",
  });
};
exports.addToFavor = (req, res, next) => {
  let userData = req.authData;

  console.log("test", userData, req.body);

  User.updateOne(
    { _id: userData._id },
    {
      $push: { favorites: { _id: req.body.musicId } },
    }
  )
    .then((data) => {
      return res.status(200).json({
        message: "",
        user: data,
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(500).json({
        message: "error in data",
      });
    });
};
exports.loginUser = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    res.json(errors);
  }
  let userData = null;
  User.findOne({ email: req.body.email }).then((user) => {
    userData = user;

    if (!user) {
      return res.status(500).json({
        message: "this email is not found!",
      });
    }
    bcrypt.compare(req.body.password, user.password).then((validPass) => {
      if (!validPass) {
        return res.status(500).json({
          message: "Invalid Password",
        });
      }
      const token = jwt.sign(
        { _id: userData._id, email: userData.email },
        constant.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // console.log("test", token, userData);
      delete userData.password;
      return res.status(200).json({
        message: "user Login successfully",
        token: token,
        user: returnUserData(userData),
      });
    });
  });
  // bcrypt.compare(req.body.password)
};

returnUserData = (userData) => {
  // console.log("test", userData);

  return {
    _id: userData._id,
    email: userData.email,
    country: userData.country,
    phone: userData.phone,
    name: userData.name,
    photo: userData.photo,
    type: userData.type,
    createdAt: userData.createdAt,
  };
};
