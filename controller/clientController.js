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
const sendEmail = require("../utils/nodemailer");
//Models

const Client = require("../models/client");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");
const Position = require("../models/position");

//Config
const keys = require("../config/key");

module.exports = {
  addClient: async (req, res, next) => {
    try {
      const { name, email, dob, contactNumber, password, confirmPassword } =
        req.body;

      //VALIDATE REQUEST BODY
      if (!name || !email || !contactNumber || !password || !confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "Probably you have missed certain fields",
        });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message: "password is not matched",
        });
      }
      const client = await Client.findOne({ email });
      if (client) {
        return res
          .status(200)
          .json({ success: false, message: "Email already exist" });
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 10);
      var date = new Date();
      const joiningYear = date.getFullYear();
      //finding username
      var str = email;
      var nameMatch = str.match(/^([^@]*)@/);
      var username = nameMatch ? nameMatch[1] : null;
      var components = [username];
      var registrationNumber = components.join("");

      const newClient = await new Client({
        special_id: Math.random().toString(36).slice(2),
        name,
        email,
        password: hashedPassword,
        joiningYear,
        registrationNumber,
        contactNumber,
        dob,
      });
      await newClient.save();
      return res.status(200).json({
        success: true,
        message: "Client registerd successfully",
        response: newClient,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  clientLogin: async (req, res, next) => {
    try {
      const { errors, isValid } = validateAdminLoginInput(req.body);

      // Check Validation
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const { registrationNumber, password } = req.body;

      const client = await Client.findOne({ registrationNumber });
      if (!client) {
        errors.registrationNumber = "Registration number not found";
        return res.status(404).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, client.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        id: client.id,
        name: client.name,
        email: client.email,
        special_id: client.special_id,
        contactNumber: client.contactNumber,
        registrationNumber: client.registrationNumber,
        joiningYear: client.joiningYear,
      };
      console.log(payload);
      jwt.sign(payload, keys.secretOrKey, { expiresIn: "1d" }, (err, token) => {
        res.json({
          success: true,
          token: token,
        });
      });
    } catch (err) {
      console.log("Error in client login", err.message);
    }
  },

  addVoter: async (req, res, next) => {
    try {
      //   console.log(req.file);

      // convert excel to json
      const position_id = req.body.position_id;
      console.log(position_id);
      var dataPathExcel = `./excel_file/${req.file.filename}`;

      var wb = xlsx.readFile(dataPathExcel);
      var sheetName = wb.SheetNames[0];
      var sheetValue = wb.Sheets[sheetName];
      // console.log(sheetValue);
      var excelData = xlsx.utils.sheet_to_json(sheetValue);

      //iterate over excel sheet
      var arr = [];
      for (var i = 0; i < excelData.length; i++) {
        const { errors, isValid } = validateVoterRegisterInput(excelData[i]);

        if (!isValid) {
          return res.status(400).json(errors);
        }
        const { name, email } = excelData[i];

        const voter = await Voter.findOne({ email });

        if (voter) {
          errors.email = `${email} already exist`;
          arr.push(email);
          continue;
          // return res.status(400).json(errors);
        }

        let hashedPassword;
        let tempPass = Math.random().toString(36).slice(6);
        hashedPassword = await bcrypt.hash(tempPass, 10);
        var date = new Date();
        const batch = date.getFullYear();
        var str = email;
        var nameMatch = str.match(/^([^@]*)@/);
        var userna = nameMatch ? nameMatch[1] : null;
        var components = ["Voter", "_", userna];

        var username = components.join("");
        await sendEmail(email, tempPass, username, "OTP", position_id);
        const newVoter = await new Voter({
          name,
          email,
          password: hashedPassword,
          username,
        });
        await newVoter.save();
      }

      //  *****************************************************
      return res.status(200).json({
        success: true,
        message:
          " Successfully added && check your registered email for Password and username",
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in adding new Voter", ${err.message}` });
    }
  },

  addCandidate: async (req, res, next) => {
    try {
      const profile = req.file.filename;
      console.log(profile);
      const { name, partyName, phone, email } = req.body;

      //VALIDATE REQUEST BODY
      const candidate = await Candidate.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ success: false, message: "Email already exist" });
      }
      // if (!name || !profile || !partyName || !phone || !email) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Probably you have missed certain fields",
      //   });
      // }

      const profile_url = `https://ezserver.herokuapp.com/profile/${req.file.filename}`;
      const newCandidate = await new Candidate({
        position_id: req.body.position_id,
        client: req.user.id,
        name,
        partyName,
        phone,
        email,
        profile: profile_url,
      });
      await newCandidate.save();
      return res.status(200).json({
        success: true,
        message: "Candidate registerd successfully",
        response: newCandidate,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
  deleteCandidate: async (req, res, next) => {
    try {
      let candidate = await Candidate.findById(req.params.id);
      let voter = await Voter.find({ candidate: req.params.id });

      if (voter.length > 0) {
        console.log("remove voter candidate id");
        for (var i = 0; i < voter.length; i++) {
          Voter.collection.update(
            { _id: voter[i]._id },
            { $unset: { candidate: "" } }
          );
        }
        // Voter.updateMany({ _id: voter.id }, { $unset: { candidate: "" } });
        // Voter.aggregate([{ $unset: "candidate" }]);
      }
      candidate.remove();

      res.status(200).json({
        success: true,
        message: "deleted sucessfully",
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: `error in deleting candidate", ${err.message}` });
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

  getResult: async (req, res, next) => {
    try {
      var map = new Map();
      const candidates = await Candidate.find({});
      var c = 0;
      let max = 0;
      for (var i = 0; i < candidates.length; i++) {
        var count = candidates[i].vote;
        var name = candidates[i].partyName;
        if (max < count) {
          max = count;
          c = name;
        }

        map.set(name, count);
      }
      console.log(map);
      res.status(200).json({
        result: [...map],
        winner: c,
      });
    } catch {
      res
        .status(400)
        .json({ message: `error in geting votin result", ${err.message}` });
    }
  },

  addPosition: async (req, res, next) => {
    try {
      const { name, description } = req.body;

      //VALIDATE REQUEST BODY
      if (!name || !description) {
        return res.status(200).json({
          success: false,
          message: "Probably you have missed certain fields",
        });
      }
      const newPosition = await new Position({
        name,
        description,
        position_id: Math.random().toString(36).slice(6),
        voter: "1",
      });
      await newPosition.save();
      return res.status(200).json({
        success: true,
        message: "Position registerd successfully",
        response: newPosition,
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  // updateProfile: async (req, res, next) => {
  //   try {
  //     const { name, email, contactNumber } = req.body;
  //     // const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
  //     // const imgResponse = await cloudinary.uploader.upload(userPostImg)
  //     const client = await Client.findOne({ email });
  //     if (name) {
  //       client.name = name;
  //       await client.save();
  //     }
  //     if (email) {
  //       client.email = email;
  //       await client.save();
  //     }
  //     if (contactNumber) {
  //       client.contactNumber = contactNumber;
  //       await client.save();
  //     }
  //     return res.status(200).json(client);
  //   } catch (err) {
  //     console.log("Error in updating Profile", err.message);
  //   }
  // },
};
