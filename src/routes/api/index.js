const router = require("express").Router();
const userRoutes = require("./UserRoutes");
const dogRoutes = require("./dogRoutes");

router.use("/users", userRoutes);
router.use("/users/", dogRoutes);

module.exports = router;
