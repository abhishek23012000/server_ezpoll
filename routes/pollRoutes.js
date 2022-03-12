const express = require("express");
const router = express.Router();
const passport = require("passport");
const { getPoll, createPoll } = require("../controller/pollController");

router.post("/create", createPoll);
router.get("/:id", getPoll);
// router.post("/addUser", addUser);

// router.get("/getResult", getResult);
module.exports = router;
