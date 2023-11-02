const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const studentController = require("../controllers/student.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("", studentController.getStudents);

router.post(
  "",
  authMiddleware,
  [
    body(["name", "phone", "group"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
    body(["price"], "this field is required").exists().isNumeric().notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  studentController.addStudent
);
router.get("/:id", studentController.getStudent);
router.get(
  "/group/:id",
  authMiddleware,
  studentController.getStudentsInsideGroup
);
router.put(
  "/:id",
  [
    body(["name", "time", "stage", "gender"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
    body(["day"], "this field is required").exists().isNumeric().notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  authMiddleware,
  studentController.updateStudent
);
router.delete("/:id", authMiddleware, studentController.deleteStudent);

module.exports = router;
