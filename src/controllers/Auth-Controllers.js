const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authRoutes = {
  async signup(req, res) {
    const { fullName, username, email, password } = req.body;

    try {
      const user = new User({ fullName, username, email, password });

      await user.save();
      const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET);
      res.send({ token });
    } catch (error) {
      return res.sendStatus(422).send(error.message);
    }
  },

  async signin(req, res) {
    const { password, email } = req.body;

    if (!email || !password) {
      return res
        .sendStatus(422)
        .send({ error: "Must provide either email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(404).send({ error: "Invalid passoword or email!" });
    }

    try {
      await user.comparePassword(password);
      const token = jwt.sign({ userId: user._id }, process.env.MY_SECRET);
      res.send("You are now signed in!");
    } catch (error) {
      return res.sendStatus(404).send({ error: "Invalid email or password" });
    }
  },
};
module.exports = authRoutes;
