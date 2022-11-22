const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/owned", controller.myPageOwned);
router.get("/selling", controller.myPageSelling);

module.exports = router;
