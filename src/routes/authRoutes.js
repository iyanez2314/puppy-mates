const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, username, email, password, zip } = req.body;

  try {
    const user = new User({ fullName, username, email, password, zip });

    await user.save();
    res.send("User Saved");
  } catch (error) {
    return res.sendStatus(422).send(error.message);
  }
});

router.post("/signin", async (req, res) => {
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
    res.send("User is now logged in");
  } catch (error) {
    return res.sendStatus(404).send({ error: "Invalid email or password" });
  }
});

module.exports = router;
