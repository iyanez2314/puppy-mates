const { Schema, model } = require("mongoose");

const PostSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: String,
    required: true,
  },
});

const Post = model("Post", PostSchema);
module.exports = Post;
