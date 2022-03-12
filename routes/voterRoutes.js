const express = require("express");
const passport = require("passport");
const router = express.Router();
const upload = require("../utils/multer");

const {
  voterLogin,
  //  forgotPassword,
  getAllCandidate,
  postOTP,
  voterCount,
} = require("../controller/voterController");

router.post("/login", voterLogin);

// router.post('/forgotPassword', forgotPassword)

router.post("/postOTP", postOTP);
router.get(
  "/getAllCandidate",
  passport.authenticate("jwt", { session: false }),
  getAllCandidate
);
router.get(
  "/voterCount/:id",
  passport.authenticate("jwt", { session: false }),
  voterCount
);
module.exports = router;
