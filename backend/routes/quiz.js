const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const QuizController = require("../controllers/quiz.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("", QuizController.getQuizs);
router.get("/level", QuizController.getAllStudentLevel);
router.post(
  "",
  authMiddleware,
  [
    body(["degree", "total", "percentage"], "this field is required")
      .exists()
      .isNumeric()
      .notEmpty(),
    body(["student"], "this field is required").exists().isString().notEmpty(),
  ],
  QuizController.addQuiz
);
router.post(
  "/students",
  authMiddleware,
  [body(["quizzes"], "this field is required").exists().isArray().notEmpty()],
  QuizController.addQuizForAllStudents
);
router.get("/:id", QuizController.getQuiz);
router.get("/student/:id", QuizController.getQuizsById);

router.put(
  "/:id",
  [
    body(["student", "group"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
  ],
  authMiddleware,
  QuizController.updateQuiz
);
router.delete("/:id", authMiddleware, QuizController.deleteQuiz);

module.exports = router;
