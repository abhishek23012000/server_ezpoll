const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  tokenVerify,
  forgotPassword,
} = require("../controller/forgotPasswordController");

router.post("/", forgotPassword);
router.post("/:clientId/:token", tokenVerify);

module.exports = router;
