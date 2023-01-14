const router = require("express").Router();
const {
  getAllDogs,
  addDogToUser,
  getAllDogsAssociatedWithOwner,
  updateDogInfo,
} = require("../../controllers/Dogs-controllers");

router.route("/").get(getAllDogs);

router.route("/:userId").get(getAllDogsAssociatedWithOwner);

router.route("/:userId/dogs/:dogId").put(updateDogInfo);

router.route("/:userId/dogs").post(addDogToUser);

module.exports = router;
