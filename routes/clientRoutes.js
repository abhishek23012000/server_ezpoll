const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");
const profileUpload = require("../utils/multerProfile");
const {
  clientLogin,

  addVoter,
  addCandidate,
  addClient,
  deleteCandidate,
  getAllCandidate,
  getResult,
} = require("../controller/clientController");

router.post("/login", clientLogin);
router.post("/addClient", addClient);
router.get("/delete/:id", deleteCandidate);
router.post(
  "/addVoter",
  upload.single("excel"),

  passport.authenticate("jwt", { session: false }),
  addVoter
);
router.post(
  "/addCandidate",
  profileUpload.single("profile"),
  passport.authenticate("jwt", { session: false }),
  addCandidate
);

router.get(
  "/getAllCandidate",
  passport.authenticate("jwt", { session: false }),
  getAllCandidate
);

router.get("/getResult", getResult);
module.exports = router;
