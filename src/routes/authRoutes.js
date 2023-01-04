const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { fullName, username, email, password, zip } = req.body;

  try {
    const user = new User({ fullName, username, email, password, zip });

    await user.save();
    console.log("saved user to database!");
  } catch (error) {
    return res.sendStatus(422).send(error.message);
  }
});

module.exports = router;
