var ReportController = require("../app/controllers/reportController");
var express = require("express");
var router = express.Router();

router.get("/humidity", ReportController.humidity);
router.get("/temparature", ReportController.temparature);
router.get("/report", function(req, res) {
    res.render("report/addSample");
});
router.post("/report", function(req, res) {
    ReportController.addTestReport(req.body.tem, req.body.humi);
    res.redirect("/report/report");
});
module.exports = router;