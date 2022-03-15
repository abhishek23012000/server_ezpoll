const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const gm = require("getmac");
let Poll = require("../models/poll");
var address = require("address");
module.exports = {
  createPoll: async (req, res, next) => {
    try {
      const { title, choice1, description, choice2, choice3 } = req.body;
      const poll_id = Math.random().toString(36).slice(2);
      const macAddress = gm.default();

      const newPoll = await new Poll({
        poll_id,
        title,
        description,
        choice1,
        choice2,
        choice3,
        mac: "1",
      });

      await newPoll.save();
      // const updateResponse = await Poll.updateOne({}, { $push: { mac: "1" } });
      return res.status(200).json({
        success: true,
        poll: newPoll,
      });
    } catch (err) {
      res.status(400).json({
        message: `error in creating poll", ${err.message}`,
        success: false,
      });
    }
  },

  getPoll: async (req, res, next) => {
    try {
      const poll = await Poll.find({
        poll_id: req.params.id,
      });
      if (poll.length === 0) {
        return res.status(404).json({ message: "No Record Found" });
      }
      res.status(200).json({
        success: true,
        result: poll,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: `error in getting poll", ${err.message}`,
      });
    }
  },

  choicePoll: async (req, res, next) => {
    try {
      // const poll = req.body.poll_id;
      const choice = req.body.choice;

      // address.mac(function (err, addr) {
      //   console.log(addr); // '78:ca:39:b0:e6:7d'
      // });
      // console.log(gm.default());
      // let macAddress = gm.default();
      // let macAddress = address.ip();
      let macAddress =
        req.header("x-forwarded-for") || req.connection.remoteAddress;

      const poll = await Poll.find({
        poll_id: req.body.poll_id,
      });

      const tempPoll = await Poll.findById(poll[0]._id);
      console.log(macAddress);

      let i = 0;
      while (typeof tempPoll.mac[i] !== "undefined") {
        if (tempPoll.mac[i] === macAddress) {
          console.log(tempPoll.mac[i]);
          console.log(macAddress);
          return res.status(200).json({
            success: false,
            message: "Already voted",
          });
        }

        i++;
      }

      const updateResponse = await Poll.updateOne(
        { _id: poll[0].id },
        { $push: { mac: macAddress } }
      );

      console.log(poll[0].id);
      // console.log(updateResponse);
      // console.log(tempPoll);
      if (choice === "choice1") {
        tempPoll.choice1Vote += 1;
        // console.log(poll[0].choice1);
      } else if (choice === "choice2") {
        // console.log(poll[0].choice2);
        tempPoll.choice2Vote += 1;
      } else {
        // console.log(poll[0].choice3);
        tempPoll.choice3Vote += 1;
      }
      await tempPoll.save();

      return res.status(200).json({
        success: true,
        result: tempPoll,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: `error in getting poll", ${err.message}`,
      });
    }
  },
};
