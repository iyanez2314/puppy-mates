const router = require("express").Router();
const {
  getAllUsers,
  updateUser,
  getUserById,
} = require("../../controllers/Users");

router.route("/users").get(getAllUsers);

router.route("/users/:id").get(getUserById).put(updateUser);

module.exports = router;
