const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getPoll,
  createPoll,
  choicePoll,
  clientPoll,
} = require("../controller/pollController");

router.post(
  "/create",
  // passport.authenticate("jwt", { session: false }),
  createPoll
);
router.get(
  "/getpoll",
  passport.authenticate("jwt", { session: false }),
  clientPoll
);
router.get("/:id", getPoll);
router.post("/choice", choicePoll);
// router.post("/addUser", addUser);

// router.get("/getResult", getResult);
module.exports = router;
