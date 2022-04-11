const Client = require("../models/client");
const Token = require("../models/token");
const sendEmail = require("../utils/nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

module.exports = {
  forgotPassword: async (req, res, next) => {
    try {
      // const schema = Joi.object({ email: Joi.string().email().required() });
      const email = req.body.email;

      const client = await Client.findOne({ email: req.body.email });
      if (!client)
        return res.status(400).send("client with given email doesn't exist");

      let token = await Token.findOne({ client: client._id });
      if (!token) {
        token = await new Token({
          clientId: client._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
      }

      const link = `http://localhost:5000/api/reset/${client._id}/${token.token}`;
      await sendEmail(client.email, link, "1", "PasswordReset", "2");

      return res.status(200).json({
        success: true,
        link: link,
      });
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  },

  tokenVerify: async (req, res, next) => {
    try {
      const password = req.body.password;

      const client = await Client.findById(req.params.clientId);
      if (!client) return res.status(400).send("invalid link or expired");

      const token = await Token.findOne({
        clientId: client._id,
        token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link or expired");

      let hashedPassword;
      hashedPassword = await bcrypt.hash(req.body.password, 10);
      client.password = hashedPassword;
      console.log(client.password);
      await client.save();
      await token.delete();

      res.send("password reset sucessfully.");
    } catch (error) {
      res.send("An error occured");
      console.log(error);
    }
  },
};

// router.post("/:userId/:token", async (req, res) => {

// });
