const router = require("express").Router();
const { signin, signup } = require("../../controllers/Auth-Controllers");

router.route("/signup").post(signup);
router.route("/signin").post(signin);

module.exports = router;
