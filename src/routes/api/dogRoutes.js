const router = require("express").Router();
const {
  getAllDogs,
  addDogToUser,
} = require("../../controllers/Users-controllers");

router.route("/dogs").get(getAllDogs);

router.route("/users/:userId/dogs").post(addDogToUser);

module.exports = router;
