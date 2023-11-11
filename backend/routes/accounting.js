const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const accountingController = require("../controllers/accounting.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get(
    "/monthly",
    authMiddleware,
    accountingController.getSumOfMonthlySalary
);
router.get(
    "/everyLesson",
    authMiddleware,
    accountingController.getSumOfLessonsSalary
);
module.exports = router;