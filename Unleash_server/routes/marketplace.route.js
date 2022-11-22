const router = require("express").Router();
const controller = require("../controller/marketplace.controller");

router.get("/ticket", controller.ticketInfo);
router.get("/history", controller.priceHistory);

module.exports = router;
