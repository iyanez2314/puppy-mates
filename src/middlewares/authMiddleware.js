const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

module.exports = async (req, res, next) => {
  // This will allow us to get the Authorization from the header
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "You must be logged in" });
  }

  // This will allow us to remove the Bearer from the token so we can see the token itself
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.MY_SECRET);
    //check if userId is valid
    if (!payload.userId) {
      return res.status(401).json({ message: "You must be logged in" });
    }
    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: "You must be logged in" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "You must be logged in" });
  }
};
