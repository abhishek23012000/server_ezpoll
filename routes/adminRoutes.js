const express = require("express");
const router = express.Router();
const passport = require("passport");
const upload = require("../utils/multer");
const profileUpload = require("../utils/multerProfile");
const {
  adminLogin,
  getAllClient,
  addAdmin,
  getAllUser,
} = require("../controller/adminController");

router.post("/login", adminLogin);
router.post("/addAdmin", addAdmin);
router.get("/getAllClient", getAllClient);
router.get("/getAllUser", getAllUser);

module.exports = router;
