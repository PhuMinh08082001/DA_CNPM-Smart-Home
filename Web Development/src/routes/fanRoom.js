var express = require("express");
var router = express.Router();
const deviceRoomController = require("../app/controllers/DeviceRoomController");
router.get("/", deviceRoomController.fanroom);

module.exports = router;
