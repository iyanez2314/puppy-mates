const router = require("express").Router();
const {
  getAllUsers,
  updateUser,
  getUserById,
} = require("../../controllers/Users-controllers");
const routeMiddleware = require("../../middlewares/routeMiddleware");

router.route("/").get(routeMiddleware, getAllUsers);
router
  .route("/:id")
  .get(routeMiddleware, getUserById)
  .put(routeMiddleware, updateUser);

module.exports = router;
