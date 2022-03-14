const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  getPoll,
  createPoll,
  choicePoll,
} = require("../controller/pollController");

router.post("/create", createPoll);
router.get("/:id", getPoll);
router.post("/choice", choicePoll);
// router.post("/addUser", addUser);

// router.get("/getResult", getResult);
module.exports = router;
