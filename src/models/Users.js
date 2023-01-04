const { Schema, model } = require("mongoose");
const Groups = require("./Groups");
const Post = require("./Posts");

const UserSchema = new Schema({
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
    required: true,
  },
  zip: {
    type: Number,
    required: true,
  },
  groups: [
    {
      type: Schema.Types.ObjectId,
      ref: "Groups",
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const User = model("User", UserSchema);

module.exports = User;
