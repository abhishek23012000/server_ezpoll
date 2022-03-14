const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");

let Poll = require("../models/poll");
module.exports = {
  createPoll: async (req, res, next) => {
    try {
      const { title, choice1, description, choice2, choice3 } = req.body;
      const poll_id = Math.random().toString(36).slice(2);
      const newPoll = await new Poll({
        poll_id,
        title,
        description,
        choice1,
        choice2,
        choice3,
      });

      await newPoll.save();
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
      const choice1 = req.body.choice1;
      const choice2 = req.body.choice2;
      const choice3 = req.body.choice3;

      const tempPoll = await Poll.findById(req.body._id);
      // console.log(tempCandidate);
      if (typeof choice1 != "undefined") {
        tempPoll.choice1Vote += 1;
        // console.log(poll[0].choice1);
      } else if (typeof choice2 != "undefined") {
        // console.log(poll[0].choice2);
        tempPoll.choice2Vote += 1;
      } else {
        // console.log(poll[0].choice3);
        tempPoll.choice3Vote += 1;
      }
      await tempPoll.save();
      // console.log(poll[0]);
      res.status(200).json({
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
