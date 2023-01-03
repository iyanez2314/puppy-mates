const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  id: {
    // TODO: Will reference the user that made the post
  },
  post: {
    type: String,
    required: true,
  },
});
