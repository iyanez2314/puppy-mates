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

// Fetch All users
router.get("/users", async (req, res) => {
  try {
    const getAllUsers = await User.find().populate("posts");
    res.send(getAllUsers);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Fetch user with ID
router.get("/user/:id", async (req, res) => {
  try {
    const getAllUserById = await User.findById(req.params.id).populate("posts");
    res.send(getAllUserById);
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

module.exports = router;
