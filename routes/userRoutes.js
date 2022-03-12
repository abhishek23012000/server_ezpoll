const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");
const profileUpload = require("../utils/multerProfile");
const {
  userLogin,

  addUser,
} = require("../controller/userController");

router.post("/login", userLogin);
router.post("/addUser", addUser);

// router.get("/getResult", getResult);
module.exports = router;
