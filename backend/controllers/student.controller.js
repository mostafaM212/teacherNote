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
  // console.log("test", req.query, req.query["numOfDocs"]);
  // console.log("test", req.query.search);

  let studentQuery = Student.find();

  if (req.query.numOfDocs && req.query.from) {
    studentQuery.skip(+req.query.from).limit(+req.query.numOfDocs);
  }
  if (req.query.search) {
    studentQuery.find({
      name: { $regex: req.query.search, $options: "i" },
    });
  }
  let ourStudents;
  studentQuery
    .populate("group")
    .then((data) => {
      ourStudents = data;
      return Student.count();
    })
    .then((count) => {
      return res.status(200).json({
        message: "Student created Successfully!",
        students: ourStudents,
        totalDocs: count,
      });
    })
    .catch((e) => {
      console.log("test", e);

      return res.status(500).json({
        message: "Error on Getting Student",
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

  Student.aggregate([
    {
      $match: { group: new mongoose.Types.ObjectId(req.params.id) }, //the condition to get the parent document from databa
    },
    {
      $lookup: {
        from: "studentattendances", //Specifies the collection in the same database to perform the join with.
        localField: "_id", //Specifies the field from the documents input to the lookup
        foreignField: "student", //Specifies the field from the documents in the from collection
        as: "studentAttendances", //Specifies the name of the new array field to add to the input documents.
        pipeline: [{ $sort: { createdAt: -1 } }],
      },
    },
  ])
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
  // console.log("test", req.body, req.params.id);

  Student.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      return res.status(200).json({
        message: "Student created Successfully!",
        student: data,
      });
    })
    .catch((e) => {
      console.log("test", e);

      return res.status(500).json({
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
