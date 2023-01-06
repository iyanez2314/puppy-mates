const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

// Updating Any Users Info
router.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    if (!userId) {
      return res
        .sendStatus(422)
        .send({ error: "Please provide ID for the user" });
    }
    const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    res.send(updatedUser);
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

module.exports = router;
