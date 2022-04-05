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
  postCount,
} = require("../controller/voterController");

router.post("/login", voterLogin);
router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  postCount
);
// router.post('/forgotPassword', forgotPassword)

router.post("/postOTP", postOTP);
router.get(
  "/getAllCandidate/:id",
  // passport.authenticate("jwt", { session: false }),
  getAllCandidate
);
router.get(
  "/voterCount/:id",
  passport.authenticate("jwt", { session: false }),
  voterCount
);
module.exports = router;
