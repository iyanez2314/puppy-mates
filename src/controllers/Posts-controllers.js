const { Posts, User } = require("../models");

const postsControllers = {
  /* ------------------------------- Create Post ------------------------------ */
  async createPost({ params, body }, res) {
    const userId = params.userId;
    const newPost = body;
    Posts.create(newPost)
      .then((dbPostData) => {
        return User.findOneAndUpdate(
          { _id: userId },
          { $push: { posts: dbPostData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  /* --------------------- GET all post that are in the DB -------------------- */
  getAllPostsInDb(req, res) {
    Posts.find({})
      .populate("user")
      .then((dbPostData) => {
        res.json(dbPostData);
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ message: "There was a error fetching all posts!" });
      });
  },
  /* ----------------------- GET Post by specefied user ----------------------- */
  getPostByUserId({ params }, res) {
    const userId = params.userId;
    User.findOne({ _id: userId })
      .populate("posts")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(400).json({ message: "Sorry something went wrong" });
      });
  },
  /* --------------------------- Edit a created post -------------------------- */
  async updatePost({ params, body }, res) {
    const postInfo = body;
    const postId = params.id;
    const userId = params.userId;

    try {
      const post = await Posts.findOne({ _id: postId, user: userId });

      if (!post) {
        return res
          .status(404)
          .send({ error: "Post not found or you are not the owner" });
      }

      const updatedPost = await Posts.findByIdAndUpdate(postId, postInfo, {
        new: true,
      });
      res.send(updatedPost);
    } catch (err) {
      res.status(422).send(err.message);
    }
  },
};
module.exports = postsControllers;
