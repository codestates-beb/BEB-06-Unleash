const router = require("express").Router();
const controller = require("../controller/marketplace.controller");

router.post("/ticket", controller.ticketInfo);

module.exports = router;
