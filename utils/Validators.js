const passwordValidator = require("password-validator");
const emailValidator = require("email-validator");

exports.isValidEmail = (email) => {
  return emailValidator.validate(email);
};

exports.isValidPassword = (password) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(13)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(3)
    .has()
    .not()
    .spaces()
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);
  return schema.validate(password);
};
