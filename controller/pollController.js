const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/key");

let Poll = require("../models/poll");
module.exports = {
  createPoll: async (req, res, next) => {
    try {
      const { title, choice1, description, choice2, choice3 } = req.body;

      //   console.log(choices);

      //   for (let i = 0; i < choices.length; i++) {
      //     console.log(choices[0].value);
      //   }
      //   let polls = [];
      //   polls.push({
      //     title: title,

      //     options: [
      //       {
      //         value: options[0].value,
      //         votes: 0,
      //       },
      //       {
      //         value: options[1].value,
      //         votes: 0,
      //       },
      //       {
      //         value: options[2].value,
      //         votes: 0,
      //       },
      //     ],
      //   });
      //   Poll.create(polls);
      //   res.json({
      //     success: true,
      //     poll: polls,
      //   });
      //   if(description==="")
      //   {

      const newPoll = await new Poll({
        title,
        description,
        choice1,
        choice2,
        choice3,
      });

      //   }else{
      //     const newPoll = await new Poll({
      //         title,
      //         choice1,
      //         choice2,
      //         choice3,
      //       });
      //   }
      await newPoll.save();
      res.status(200).json({
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
