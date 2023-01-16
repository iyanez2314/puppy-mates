const router = require("express").Router();
const { signin, signup } = require("../../controllers/Auth-Controllers");
const authMiddleware = require("../../middlewares/authMiddleware");

router.route("/signup").post(signup);
router.route("/signin", authMiddleware).post(signin);

module.exports = router;
