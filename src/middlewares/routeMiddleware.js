const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).json({ error: "You must be logged in." });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.MY_SECRET);
    const { userId } = payload;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(403).json({ error: "You must be logged in." });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ error: "You must be logged in." });
  }
};
