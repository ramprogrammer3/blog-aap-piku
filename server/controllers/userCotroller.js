const { validationResult } = require("express-validator");
const userModel = require("../models/user");
const {
  hashedPassword,
  createToken,
  checkPassword,
} = require("../services/authService");

module.exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const existEmail = await userModel.findOne({ email });
      if (!existEmail) {
        const hashed = await hashedPassword(password);
        const user = await userModel.create({
          name,
          email,
          password: hashed,
        });
        const token = createToken(user);
        return res
          .status(201)
          .json({ msg: "your account is created successfully", token });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "email is already available" }] });
      }
    } catch (error) {
      return res.status(500).json({ errors: "internal server error" });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const user = await userModel.findOne({ email });
      if (user) {
        const comparePassword = await checkPassword(password, user.password);
        if (comparePassword) {
          const token = createToken(user);
          return res.status(200).json({ msg: "user login successfull", token });
        } else {
          return res
            .status(401)
            .json({ errors: [{ msg: "password does not match" }] });
        }
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "user does not found with this eamil" }] });
      }
    } catch (error) {
      return res.status(500).json("internal server error");
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
