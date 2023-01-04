const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

router.put("/userId", async (req, res) => {
  const { password, email, zip, fullName } = req.body;
  try {
    console.log(req.body);
    // await User.findOneAndUpdate({ email });
    // res.send("User found");
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

module.exports = router;
