const router = require("express").Router();
const controller = require("../controller/marketplace.controller");
const {
  authorityCheckGet,
  authorityCheckPost,
} = require("../controller/authority.controller");

router.get("/ticket", controller.ticketInfo);
router.get("/market", controller.marketInfo);
router.get("/history", controller.priceHistory);
router.get("/signature", authorityCheckGet, controller.signature);
router.post("/mint", authorityCheckPost, controller.mint);
router.post("/sell", authorityCheckPost, controller.sell);
router.put("/cancel", authorityCheckPost, controller.cancel);
router.put("/buy", authorityCheckPost, controller.buy);
router.put("/exchange", authorityCheckPost, controller.ticketExchange);

module.exports = router;
