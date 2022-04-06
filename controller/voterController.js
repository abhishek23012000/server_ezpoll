const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const sendEmail = require("../utils/nodemailer");

const validatevoterLoginInput = require("../validation/voterLogin");

const validateForgotPassword = require("../validation/forgotPassword");
const validateOTP = require("../validation/otpValidation");

// models
const Candidate = require("../models/candidate");
const Position = require("../models/position");
const Voter = require("../models/voter");

module.exports = {
  voterLogin: async (req, res, next) => {
    try {
      const { errors, isValid } = validatevoterLoginInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { username, password } = req.body;

      const voter = await Voter.findOne({ username });
      // console.log(voter);
      if (!voter) {
        errors.username = "username number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, voter.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const { email } = voter;

      //  voter = await Voter.findOne({ email })
      // if (!voter) {
      //     errors.email = "Email Not found, Provide registered email"
      //     return res.status(400).json(errors)
      // }

      // console.log(voter);
      const payload = { id: voter.id, voter };
      jwt.sign(payload, keys.secretOrKey, { expiresIn: "1d" }, (err, token) => {
        return res.json({
          success: true,
          token: token,
        });
      });

      // function generateOTP() {
      //   var digits = "0123456789";
      //   let OTP = "";
      //   for (let i = 0; i < 6; i++) {
      //     OTP += digits[Math.floor(Math.random() * 10)];
      //   }
      //   return OTP;
      // }
      // const OTP = await generateOTP();
      // voter.otp = OTP;
      // await voter.save();
      // await sendEmail(voter.email, OTP, "OTP");
      // res.status(200).json({ message: "check your registered email for OTP" });
      // const helper = async () => {
      //   voter.otp = "";
      //   await voter.save();
      // };
      // setTimeout(function () {
      //   helper();
      // }, 300000);

      // res.json("good");
    } catch {
      console.log("Error in sending email", err.message);
    }
  },

  getAllCandidate: async (req, res, next) => {
    try {
      const candidates = await Candidate.find({
        position_id: req.params.id,
      });
      if (candidates.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No Record Found" });
      }
      const position = await Position.find({
        position_id: req.params.id,
      });
      return res
        .status(200)
        .json({ position: position, success: true, result: candidates });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in getting candidate", ${err.message}` });
    }
  },
  voteCount: async (req, res, next) => {
    try {
      const tempPosition = await Candidate.find({
        position_id: req.params.id,
      });
      console.log(tempPosition[0].vote);
      let l = tempPosition.length;

      let candidates = [];

      var max = 0;
      var partyName = "";
      for (var i = 0; i < l; i++) {
        var t = tempPosition[i].vote;
        let candidate = {
          count: tempPosition[i].vote,
          name: tempPosition[i].name,
          partyName: tempPosition[i].partyName,
        };
        candidates.push(candidate);
        if (t > max) {
          max = t;
          partyName = tempPosition[i].partyName;
          name = tempPosition[i].name;
        }
      }

      let winner = {
        message: "winner",
        count: max,
        partyName: partyName,
        name: name,
      };
      // candidates.push(winner);
      return res.status(200).json({
        success: true,
        winner,
        candidates,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in voting process", ${err.message}` });
    }
  },

  postCount: async (req, res, next) => {
    try {
      // console.log("req.user", req.user.id);
      const voter = await Voter.findById(req.user._id);

      // console.log(vote);
      const tempPosition = await Position.find({
        position_id: req.body.position_id,
      });

      const position = await Position.findById(tempPosition[0]._id);
      // console.log(typeof position.voter[0]);

      const tempCandidate = await Candidate.findById(req.body.choice_id);

      let i = 0;
      while (typeof position.voter[i] !== "undefined") {
        if (position.voter[i] === req.user.id) {
          console.log(position.voter[i]);
          return res.status(200).json({
            success: false,
            message: "Already voted",
          });
        }
        i++;
      }
      console.log(typeof req.user.id);

      // // console.log(position.voter);

      const email = req.user.email;

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
      // email, secretToken, registrationNumber, mode
      await sendEmail(email, OTP, tempCandidate, "VOTEROTP");
      return res
        .status(200)
        .json({ message: "check your registered email for OTP" });
      // const helper = async () => {
      //   voter.otp = "";
      //   await voter.save();
      // };
      // setTimeout(function () {
      //   helper();
      // }, 300000);

      // return res.json("good");
    } catch (err) {
      return res
        .status(400)
        .json({ message: `error in voting process", ${err.message}` });
    }
  },

  postOTP: async (req, res, next) => {
    try {
      const otp = req.body.otp;
      const tempPosition = await Position.find({
        position_id: req.body.position_id,
      });
      // const voter = await Voter.findOne({ req.user.id });
      const voter = await Voter.findById(req.user.id);
      if (!voter) {
        return res.status(404).json("voter is not found");
      }

      if (voter.otp !== otp) {
        // errors.otp = "Invalid OTP, check your email again";
        return res.status(400).json("Invalid OTP, check your email again");
      }

      const tempCandidate = await Candidate.findById(req.body.choice_id);

      tempCandidate.vote += 1;
      await tempCandidate.save();

      const updateResponse = await Position.updateOne(
        { _id: tempPosition[0]._id },
        { $push: { voter: req.user.id } }
      );

      return res.status(200).json({ message: "Thanks for voting" });
    } catch (err) {
      const tempPosition = await Position.find({
        position_id: req.body.position_id,
      });

      let position = await Position.findById(tempPosition[0]._id);

      let p = position.voter.indexOf(req.user.id);

      update = { $set: {} };

      update["$set"]["voter." + p] = "new";
      await Position.findByIdAndUpdate({ _id: tempPosition[0]._id }, update);

      return res
        .status(400)
        .json({ message: `Error in submitting otp", ${err.message}` });
    }
  },
};
