const router = require("express").Router();
const {
  createPost,
  getAllPostsInDb,
  getPostByUserId,
  updatePost,
} = require("../../controllers/Posts-controllers");
const routeMiddleware = require("../../middlewares/routeMiddleware");

router.route("/").get(routeMiddleware, getAllPostsInDb);

router.route("/:userId").get(routeMiddleware, getPostByUserId);

router.route("/:userId").post(routeMiddleware, createPost);

router.route("/:userId/post/:id").put(routeMiddleware, updatePost);

module.exports = router;
