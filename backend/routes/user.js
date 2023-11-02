const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const usersController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multerUserMiddleware = require("../middlewares/multer-user.middleware");

// const validationErrorMiddleware = require("../middleware/validationError.middleware");
router.get("", usersController.getUsers);

router.post(
  "",
  [
    body(["email"], "this field is required").exists().isEmail(),
    body(["password", "name", "phone"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  multerUserMiddleware,
  usersController.addUser
);
router.post(
  "/login",
  [
    body(["email"], "this field is required").exists().isEmail(),
    body(["password"], "this field is required").exists().isString().notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  usersController.loginUser
);

router.get("/:id", usersController.getUser);
router.put("/:id", authMiddleware, usersController.updateUser);
router.delete("/:id", authMiddleware, usersController.deleteUser);

module.exports = router;
