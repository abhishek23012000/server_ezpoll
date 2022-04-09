const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");
const gm = require("getmac");
let Poll = require("../models/poll");
var address = require("address");
module.exports = {
  createPoll: async (req, res, next) => {
    try {
      const { title, description, choices, exp } = req.body;
      const poll_id = Math.random().toString(36).slice(2);
      // const macAddress = gm.default();

      // console.log(req.body.choices.length);

      // const newPoll = await new Poll({
      //   client: req.user.id,
      //   poll_id,
      //   title,
      //   description,
      //   choice1,
      //   choice2,
      //   choice3,
      //   mac: "1",
      // });

      const newPoll = await new Poll({
        // client: req.user.id,
        exp,
        poll_id,
        title,
        description,
        choices: choices,
        mac: "1",
      });
      await newPoll.save();
      // return res.json("good");

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
      const choice_id = req.body.choice_id;
      let macAddress =
        req.header("x-forwarded-for") || req.connection.remoteAddress;

      const poll = await Poll.find({
        poll_id: req.body.poll_id,
      });

      const tempPoll = await Poll.findById(poll[0]._id);
      // console.log(macAddress);

      let i = 0;
      while (typeof tempPoll.mac[i] !== "undefined") {
        if (tempPoll.mac[i] === macAddress) {
          return res.status(200).json({
            success: false,
            message: "Already voted",
          });
        }

        i++;
      }

      // console.log(poll[0].id);

      var ind = tempPoll.choices.findIndex((item) => item.id === choice_id);

      tempPoll.choices[ind].count += 1;
      await tempPoll.save();
      const updateResponse = await Poll.updateOne(
        { _id: poll[0].id },
        { $push: { mac: macAddress } }
      );

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
  clientPoll: async (req, res, next) => {
    try {
      const poll = await Poll.find({
        client: req.user.id,
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
};
