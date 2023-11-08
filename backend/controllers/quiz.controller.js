const Quiz = require("../models/quiz.model");
const { validationResult } = require("express-validator");

exports.addQuiz = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const newQuiz = new Quiz({
    ...req.body,
  });
  newQuiz
    .save()
    .then((data) => {
      res.status(200).json({
        message: "Quiz created Successfully!",
        Quiz: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};
exports.addQuizForAllStudents = (req, res, next) => {
  const errors = validationResult(req);

  // If some error occurs, then this
  // block of code will run
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  const newQuizs = Quiz.insertMany([...req.body.quizzes]);

  newQuizs
    .then((data) => {
      return res.status(200).json({
        message: "Quiz created Successfully!",
        Quizs: data,
      });
    })
    .catch((e) => {
      return res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};

exports.getQuizs = (req, res, next) => {
  Quiz.find()
    .then((data) => {
      res.status(200).json({
        message: "Quiz created Successfully!",
        Quizs: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};
exports.getQuizsById = (req, res, next) => {
  console.log("test", req.params.id);

  Quiz.find({ student: req.params.id })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.status(200).json({
        message: "Quiz created Successfully!",
        Quizs: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};
exports.getQuiz = (req, res, next) => {
  Quiz.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Quiz created Successfully!",
        Quiz: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};
exports.updateQuiz = (req, res, next) => {
  Quiz.updateOne({ _id: req.params.id }, { ...req.body })
    .then((data) => {
      res.status(200).json({
        message: "Quiz created Successfully!",
        Quiz: data,
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};

exports.deleteQuiz = (req, res, next) => {
  Quiz.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        message: "Quiz deleted Successfully!",
      });
    })
    .catch((e) => {
      res.status(500).json({
        message: "Error on Saving Quiz",
      });
    });
};
