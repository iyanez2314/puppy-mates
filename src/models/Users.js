const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: {
    // TODO: Need to figure out how to auto-generate an id per user
  },
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  zip: {
    type: Number,
    required: true,
  },
});

mongoose.model("User", UserSchema);
