const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateStudentLoginInput = (data) => {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isLength(data.username, { min: 4 })) {
    errors.username = "Username Number must be of 4 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "username Number field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateStudentLoginInput;
