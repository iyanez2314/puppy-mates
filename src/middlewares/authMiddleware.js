const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
require("dotenv").config();

module.exports = (req, res, next) => {
  // This will allow us to get the Authorization from the header
  const { authorization } = req.headers; // When we make the request it will look something like this => 'Bearer <AUTH_TOKEN>'

  if (!authorization) {
    return res.sendStatus(403).send({ error: "You must be logged in" });
  }

  // This will allow us to remove the Bearer from the token so we can see the token itself
  const token = authorization.replace("Bearer ", ""); // So instead of having this 'Bearer <AUTH_TOKEN>' we will now have this '<AUTH_TOKEN>'

  jwt.sign(token, process.env.MY_SECRET, async (err, payload) => {
    if (err) {
      return res.sendStatus(403).send({ error: "You must be logged in." });
    }

    // Destructind the id off the payload
    const { userId } = payload;

    const user = await User.findById(userId);

    req.user = user;
    next();
  });
};
