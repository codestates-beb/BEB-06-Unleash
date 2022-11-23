const router = require("express").Router();
const controller = require("../controller/user.controller");

router.get("/owned", controller.myPageOwned);
router.get("/selling", controller.myPageSelling);
router.post("/joinMembership", controller.joinMembership);

module.exports = router;
