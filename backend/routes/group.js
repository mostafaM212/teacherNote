const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
// const { check, validationResult } = require("express-validator");
const groupController = require("../controllers/group.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// const validationErrorMiddleware = require("../middleware/validationError.middleware");
router.get("", groupController.getGroups);

router.post(
  "",
  authMiddleware,
  [
    body(["name", "stage", "gender"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
    body(["appointments"], "this field is required")
      .exists()
      .isArray()
      .notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  groupController.addGroup
);
router.get("/:id", groupController.getGroup);
router.put(
  "/:id",
  [
    body(["name", "stage", "gender"], "this field is required")
      .exists()
      .isString()
      .notEmpty(),
    body(["appointments"], "this field is required")
      .exists()
      .isArray()
      .notEmpty(),
    // check("stage", "this field is required").isString(),
  ],
  authMiddleware,
  groupController.updateGroup
);
router.delete("/:id", authMiddleware, groupController.deleteGroup);

module.exports = router;
