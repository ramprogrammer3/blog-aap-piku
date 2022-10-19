const express = require("express");
const router = express.Router();
const {
  registerValidation,
  loginValidation,
} = require("../validations/userValidation");
const { register, login } = require("../controllers/userCotroller");

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

module.exports = router;
