const router = require("express").Router();
const {
  getAllDogs,
  addDogToUser,
} = require("../../controllers/Dogs-controllers");

router.route("/").get(getAllDogs);

router.route("/:userId/dogs").post(addDogToUser);

module.exports = router;
