const router = require("express").Router();
const controller = require("../controller/marketplace.controller");

router.get("/ticket", controller.ticketInfo);
router.get("/history", controller.priceHistory);
router.post("/sell", controller.sell);
router.post("/cancel", controller.cancel);

module.exports = router;
