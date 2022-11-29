const router = require("express").Router();
const controller = require("../controller/user.controller");
const {
  authorityCheckGet,
  authorityCheckPost,
} = require("../controller/authority.controller");

router.get("/owned", authorityCheckGet, controller.myPageOwned);
router.get("/selling", authorityCheckGet, controller.myPageSelling);
router.post("/joinMembership", controller.joinMembership);
router.post("/login", controller.login);
router.get("/selled", authorityCheckGet, controller.myPageSelled);
router.get("/approve", controller.approve);
router.get("/logout", controller.logout);

module.exports = router;
