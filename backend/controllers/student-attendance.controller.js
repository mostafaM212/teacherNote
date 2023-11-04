const StudentAttendance = require("../models/studentAttendance.model");
const { validationResult } = require("express-validator");

exports.addStudentAttendance = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const newStudentAttendance = new StudentAttendance({
    ...req.body,
  });
  newStudentAttendance
    .save()
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendance: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
exports.addStudentAttendanceForAllStudents = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const newStudentAttendances = StudentAttendance.insertMany([
    ...req.body.studentAttendances,
  ]);

  newStudentAttendances
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendances: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};

exports.getStudentAttendances = (req, res, next) => {
  StudentAttendance.find()
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendances: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
exports.getStudentAttendancesByGroupId = (req, res, next) => {
  StudentAttendance.find({ group: req.params.id })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendances: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
exports.getStudentAttendancesById = (req, res, next) => {
  StudentAttendance.find({ student: req.params.id })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendances: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
exports.getStudentAttendance = (req, res, next) => {
  StudentAttendance.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendance: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
exports.updateStudentAttendance = (req, res, next) => {
  StudentAttendance.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance created Successfully!",
        StudentAttendance: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};

exports.deleteStudentAttendance = (req, res, next) => {
  StudentAttendance.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "StudentAttendance deleted Successfully!",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving StudentAttendance",
      });
    });
};
