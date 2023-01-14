const router = require("express").Router();
const {
  getAllUsers,
  updateUser,
  getUserById,
} = require("../../controllers/Users-controllers");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUserById).put(updateUser);

module.exports = router;
