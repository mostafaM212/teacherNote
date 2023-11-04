const Group = require("../models/group.model");
const { validationResult } = require("express-validator");

exports.addGroup = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const auth = req.authData;

  const newGroup = new Group({
    ...req.body,
    user: auth._id,
  });
  newGroup
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Group created Successfully!",
        group: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Group",
      });
    });
};

exports.getGroups = (req, res, next) => {
  Group.find()
    .then((data) => {
      res.status(200).json({
        message: "Group created Successfully!",
        groups: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Group",
      });
    });
};
exports.getGroup = (req, res, next) => {
  Group.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Group created Successfully!",
        group: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Group",
      });
    });
};
exports.updateGroup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  Group.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      return res.status(200).json({
        message: "Group created Successfully!",
        group: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error on Saving Group",
      });
    });
};

exports.deleteGroup = (req, res, next) => {
  Group.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Group deleted Successfully!",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Group",
      });
    });
};
