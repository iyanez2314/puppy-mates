const express = require("express");
const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

const router = express.Router();

// Creating a post that is associated with said user

router.post("/posts/:id", async (req, res) => {
  try {
    const post = await Post.create({
      user: req.params.id,
      post: req.body.post,
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { posts: post } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    return res.sendStatus(400).send(error);
  }
});

module.exports = router;
