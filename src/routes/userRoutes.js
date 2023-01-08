const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const router = express.Router();

// TODO: NEED TO CHANGE THIS UP TO MATCH MY API SET UP
router.put("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

// Fetch All users
router.get("/users", async (req, res) => {
  try {
    const getAllUsers = await User.find().populate("posts");
    res.send(getAllUsers);
  } catch (error) {
    return res.sendStatus(400).json(error);
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
