const Student = require("../models/student.model");
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
exports.addStudent = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const auth = req.authData;

  const newStudent = new Student({
    ...req.body,
    user: auth._id,
  });
  newStudent
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Student created Successfully!",
        student: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};

exports.getStudents = (req, res, next) => {
  Student.find()
    .then((data) => {
      res.status(200).json({
        message: "Student created Successfully!",
        students: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};
exports.getStudent = (req, res, next) => {
  Student.findOne({ _id: req.params.id })
    .populate("group")
    .then((data) => {
      res.status(200).json({
        message: "Student created Successfully!",
        student: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};
exports.getStudentsInsideGroup = (req, res, next) => {
  // console.log("test", req);

  Student.find({ group: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Student created Successfully!",
        students: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};
exports.updateStudent = (req, res, next) => {
  Student.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      res.status(200).json({
        message: "Student created Successfully!",
        student: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};

exports.deleteStudent = (req, res, next) => {
  Student.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Student deleted Successfully!",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Student",
      });
    });
};
