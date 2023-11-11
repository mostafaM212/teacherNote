const httpStatus = require("http-status");
const Student = require("../models/student.model");

exports.getSumOfMonthlySalary = (req, res, next) => {
  Student.aggregate([
    {
      $match: { paymentMethod: "monthly" },
    },
    {
      $group: {
        totalSalary: { $sum: "$price" },
        count: { $sum: 1 },
        _id: null,
      },
    },
  ])
    .then((data) => {
      return res.status(200).json({
        data: data[0],
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(httpStatus[500]).json({
        message: "there is an error occurs",
      });
    });
};
exports.getSumOfLessonsSalary = (req, res, next) => {
  Student.aggregate([
    {
      $match: { paymentMethod: "every lesson" },
    },
    {
      $group: {
        totalSalary: { $sum: "$price" },
        count: { $sum: 1 },
        _id: null,
      },
    },
  ])
    .then((data) => {
      return res.status(200).json({
        data: data[0],
      });
    })
    .catch((e) => {
      console.log("test", e);
      return res.status(httpStatus[500]).json({
        message: "there is an error occurs",
      });
    });
};
