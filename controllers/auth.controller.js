const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { isValidEmail, isValidPassword } = require("../utils/Validators.js");
const bcrypt = require("bcrypt");
const registerEmail = require("../mail/Register.mail.js");
const db = require("../models/index.js");
const sequelize = db.sequelize;
const User = db.User;

exports.register = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // validate user data from request
      const { email, first_name, last_name, password, age, city } = req.body;
      if (!email || !first_name || !last_name || !password || !age || !city) {
        next(createError(400, "All fields are required"));
        return;
      }

      // validate email and password
      if (!isValidEmail(email) || !isValidPassword(password)) {
        next(createError(400, "Invalid email or password"));
        return;
      }

      // check if user exists
      const user = await User.findOne({ where: { email } }, { transaction });

      // if user exists, return 400
      if (user) {
        next(createError(400, "User already exists"));
        return;
      }

      // add user to database
      const newUser = await User.create(
        {
          email: email,
          first_name: first_name,
          last_name: last_name,
          password: bcrypt.hashSync(password, 10),
          age: age,
          city: city,
        },
        { transaction }
      );

      if (!newUser) {
        next(createError(400, "User not created"));
        return;
      }

      // generate token for user
      const token = jwt.sign(
        {
          id: newUser.id,
        },
        process.env.JWT_SECRET
      );

      // send email to user
      registerEmail(email, token);

      res.send({
        status: 200,
        message: "Success",
        jwt_token: token,
      });
    });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};

exports.login = async (req, res, next) => {
  try {
    await sequelize.transaction(async (transaction) => {
      // validate user data from request
      const { email, password } = req.body;

      // validate email
      if (!isValidEmail(email)) {
        next(createError(400, "Invalid email or password"));
        return;
      }

      // check if user exists
      const user = await User.findOne({ where: { email: email }, transaction });

      // if user does not exist, return 400
      if (!user) {
        next(createError(400, "User not found"));
        return;
      }

      // check if password is correct
      const isPasswordValid = bcrypt.compareSync(password, user.password);

      // if password is not correct, return 400
      if (!isPasswordValid) {
        next(createError(400, "Invalid credentials"));
        return;
      }

      // generate token for user
      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET
      );

      res.send({
        status: 200,
        message: "Success",
        jwt_token: token,
      });
    });
  } catch (err) {
    next(createError(500, "Internal server error"));
  }
};
