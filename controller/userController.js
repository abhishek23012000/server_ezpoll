const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
let multer = require("multer");

//Validation

//Models

const Client = require("../models/client");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const User = require("../models/user");

//Config
const keys = require("../config/key");

module.exports = {
  addUser: async (req, res, next) => {
    try {
      const { name, email, contactNumber, password } = req.body;

      //VALIDATE REQUEST BODY
      if (!name || !email || !contactNumber || !password) {
        return res.status(400).json({
          success: false,
          message: "Probably you have missed certain fields",
        });
      }

      const user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exist" });
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 10);

      //finding username
      var str = email;
      var nameMatch = str.match(/^([^@]*)@/);
      var username = nameMatch ? nameMatch[1] : null;
      var components = [username];
      var registrationNumber = components.join("");

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,

        registrationNumber,
        contactNumber,
      });
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User registerd successfully",
        response: newUser,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  userLogin: async (req, res, next) => {
    try {
      const { registrationNumber, password } = req.body;

      const user = await User.findOne({ registrationNumber });
      if (!user) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        contactNumber: user.contactNumber,
        registrationNumber: user.registrationNumber,
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: "1d" }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } catch (err) {
      console.log("Error in user login", err.message);
    }
  },
};
