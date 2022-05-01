var express = require("express");

var router = express.Router();
const deviceController = require("../app/controllers/DeviceController");
router.get("/:id/aircondition", function(req, res) {
    res.render("devices/aircondition");
});

router.get("/:id/fan", deviceController.fan);

router.get("/:id/gas", function(req, res) {
    res.render("devices/gasconcen");
});

router.get("/:id/light", function(req, res) {
    res.render("devices/light");
});

router.get("/:id", function(req, res) {
    res.render("room/room", { nameroom: req.params.id });
});

module.exports = router;