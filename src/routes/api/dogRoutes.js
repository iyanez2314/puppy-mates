const router = require("express").Router();
const {
  getAllDogs,
  addDogToUser,
  getAllDogsAssociatedWithOwner,
} = require("../../controllers/Dogs-controllers");

router.route("/").get(getAllDogs);

router.route("/:userId").get(getAllDogsAssociatedWithOwner);

router.route("/:userId/dogs").post(addDogToUser);

module.exports = router;
