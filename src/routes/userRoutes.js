const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

// Updating Any Users Info
router.put("/user/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with that Id!" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// Fetch all the users with posts
router.get("/user/:id", async (req, res) => {
  try {
    const getAllUsers = await User.findById(req.params.id).populate("posts");
    res.send(getAllUsers);
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

module.exports = router;
