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
    const { id } = payload;
    const user = await User.findById(id);

    if (!user) {
      return res.status(403).json({ error: "You must be logged in." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "You must be logged in." });
  }
};
