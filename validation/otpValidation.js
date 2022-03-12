const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateOTP = (data) => {
  let errors = {};
  data.otp = !isEmpty(data.otp) ? data.otp : "";

  if (!Validator.isLength(data.otp, { min: 6, max: 6 })) {
    errors.otp = "OTP must contain six character ";
  }

  if (Validator.isEmpty(data.otp)) {
    errors.otp = "OTP field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateOTP;
