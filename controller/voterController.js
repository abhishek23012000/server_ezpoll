const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const sendEmail = require("../utils/nodemailer");
const Voter = require("../models/voter");

const validatevoterLoginInput = require("../validation/voterLogin");

const validateForgotPassword = require("../validation/forgotPassword");
const validateOTP = require("../validation/otpValidation");
const Candidate = require("../models/candidate");

module.exports = {
  voterLogin: async (req, res, next) => {
    try {
      const { errors, isValid } = validatevoterLoginInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const voter = await Voter.findOne({ registrationNumber });
      if (!voter) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, voter.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const { email } = voter;
      console.log(email);
      //  voter = await Voter.findOne({ email })
      // if (!voter) {
      //     errors.email = "Email Not found, Provide registered email"
      //     return res.status(400).json(errors)
      // }

      console.log(voter);
      const payload = { id: voter.id, voter };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: "1d" }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });

      function generateOTP() {
        var digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 6; i++) {
          OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
      }
      const OTP = await generateOTP();
      voter.otp = OTP;
      await voter.save();
      await sendEmail(voter.email, OTP, "OTP");
      res.status(200).json({ message: "check your registered email for OTP" });
      const helper = async () => {
        voter.otp = "";
        await voter.save();
      };
      setTimeout(function () {
        helper();
      }, 300000);

      // res.json("good");
    } catch {
      console.log("Error in sending email", err.message);
    }
  },

  postOTP: async (req, res, next) => {
    try {
      const { errors, isValid } = validateOTP(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, otp } = req.body;

      const voter = await Voter.findOne({ registrationNumber });
      if (!voter) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }

      if (voter.otp !== otp) {
        errors.otp = "Invalid OTP, check your email again";
        return res.status(400).json(errors);
      }

      const payload = { id: voter.id, voter };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({
          success: true,
          token: "Bearer " + token,
        });
      });
    } catch (err) {
      console.log("Error in submitting otp", err.message);
      return res.status(200);
    }
  },

  getAllCandidate: async (req, res, next) => {
    try {
      const candidates = await Candidate.find({
        special_id: req.user.special_id,
      });
      if (candidates.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({ result: candidates });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting candidate", ${err.message}` });
    }
  },
  voterCount: async (req, res, next) => {
    try {
      console.log("req.user", req.user._id);
      const voter = await Voter.findById(req.user._id);
      const tempCandidate = await Candidate.findById(req.params.id);
      console.log(tempCandidate);

      if (!voter.candidate) {
        (voter.candidate = req.params.id), await voter.save();
        tempCandidate.vote += 1;
        await tempCandidate.save();
      } else {
        return res.status(200).json({ message: "already voted" });
      }

      return res.status(200).json({ message: "Thanks for voting" });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in voting process", ${err.message}` });
    }
  },
};
