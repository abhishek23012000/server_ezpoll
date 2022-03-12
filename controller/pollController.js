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
};
