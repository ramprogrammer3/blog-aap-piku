const { body } = require("express-validator");

module.exports.registerValidation = [
  body("name").not().isEmpty().trim().escape().withMessage("Name is required "),
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Email is required"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("password must be 8 character"),
];

module.exports.loginValidation = [
  body("email")
    .isEmail()
    .normalizeEmail()
    .trim()
    .escape()
    .withMessage("Email is required"),
  body("password").not().isEmpty().withMessage("Password must be 8 character"),
];
