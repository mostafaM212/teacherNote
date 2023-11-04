const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const studentAttendanceController = require("../controllers/student-attendance.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("", studentAttendanceController.getStudentAttendances);

router.post(
  "",
  authMiddleware,
  [
    body(["group", "student"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
  ],
  studentAttendanceController.addStudentAttendance
);
router.post(
  "/group",
  authMiddleware,
  [
    body(["studentAttendances"], "this field is required")
      .exists()
      .isArray()
      .notEmpty(),
  ],
  studentAttendanceController.addStudentAttendanceForAllStudents
);
router.get("/:id", studentAttendanceController.getStudentAttendance);
router.get(
  "/student/:id",
  studentAttendanceController.getStudentAttendancesById
);
router.get(
  "/group/:id",
  studentAttendanceController.getStudentAttendancesByGroupId
);
router.put(
  "/:id",
  [
    body(["student", "group"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
  ],
  authMiddleware,
  studentAttendanceController.updateStudentAttendance
);
router.delete(
  "/:id",
  authMiddleware,
  studentAttendanceController.deleteStudentAttendance
);

module.exports = router;
