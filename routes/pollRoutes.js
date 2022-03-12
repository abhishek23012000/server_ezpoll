const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  //   addUser,
  createPoll,
} = require("../controller/pollController");

router.post("/create", createPoll);
// router.post("/addUser", addUser);

// router.get("/getResult", getResult);
module.exports = router;
