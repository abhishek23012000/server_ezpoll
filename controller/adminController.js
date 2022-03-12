const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
let multer = require("multer");
const excelToJson = require("convert-excel-to-json");
//Validation
const validateAdminRegisterInput = require("../validation/adminRegister");
const validateVoterRegisterInput = require("../validation/voterRegister");
const validateAdminLoginInput = require("../validation/adminLogin");
var xlsx = require("xlsx");
//Models

const Admin = require("../models/admin");
const Client = require("../models/client");
const User = require("../models/user");

//Config
const keys = require("../config/key");

module.exports = {
  addAdmin: async (req, res, next) => {
    try {
      const { name, email, dob, contactNumber } = req.body;

      //VALIDATE REQUEST BODY
      if (!name || !email || !dob || !contactNumber) {
        return res.status(400).json({
          success: false,
          message: "Probably you have missed certain fields",
        });
      }

      const admin = await Admin.findOne({ email });
      if (admin) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exist" });
      }
      const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });

      let hashedPassword;
      hashedPassword = await bcrypt.hash(dob, 10);
      var date = new Date();
      const joiningYear = date.getFullYear();
      //finding username
      var str = email;
      var nameMatch = str.match(/^([^@]*)@/);
      var username = nameMatch ? nameMatch[1] : null;
      var components = [username];
      var registrationNumber = components.join("");

      const newAdmin = await new Admin({
        name,
        email,
        password: hashedPassword,
        joiningYear,
        registrationNumber,
        avatar,
        contactNumber,
        dob,
      });
      await newAdmin.save();
      return res.status(200).json({
        success: true,
        message: "Admin registerd successfully",
        response: newAdmin,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  adminLogin: async (req, res, next) => {
    try {
      const { errors, isValid } = validateAdminLoginInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const admin = await Admin.findOne({ registrationNumber });
      if (!admin) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, admin.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        contactNumber: admin.contactNumber,
        avatar: admin.avatar,
        registrationNumber: admin.registrationNumber,
        joiningYear: admin.joiningYear,
      };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: "1h" }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } catch (err) {
      console.log("Error in admin login", err.message);
    }
  },

  getAllClient: async (req, res, next) => {
    try {
      const clients = await Client.find({});
      if (clients.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: clients });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting candidate", ${err.message}` });
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = await User.find({});
      if (users.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: users });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting user", ${err.message}` });
    }
  },
};
