const router = require("express").Router();
const {
  getAllDogs,
  addDogToUser,
  getAllDogsAssociatedWithOwner,
  updateDogInfo,
} = require("../../controllers/Dogs-controllers");
const routeMiddleware = require("../../middlewares/routeMiddleware");

router.route("/").get(routeMiddleware, getAllDogs);

router.route("/:userId").get(routeMiddleware, getAllDogsAssociatedWithOwner);

router.route("/:userId/dogs/:dogId").put(routeMiddleware, updateDogInfo);

router.route("/:userId/dogs").post(routeMiddleware, addDogToUser);

module.exports = router;
