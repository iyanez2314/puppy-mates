const router = require("express").Router();
const userRoutes = require("./UserRoutes");
const dogRoutes = require("./dogRoutes");
const authRoutes = require("./authRoutes");

router.use("/users", userRoutes);
router.use("/dogs", dogRoutes);
router.use("/userauth", authRoutes);
module.exports = router;
