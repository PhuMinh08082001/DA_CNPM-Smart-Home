var SiteController = require("../app/controllers/siteController");
var express = require("express");
var router = express.Router();

/* GET home page. */
//  router.get('/',  function (req, res, next) {
//      user =  JSON.parse(JSON.stringify(req.user));
//      res.render('homepage/home', {user: user });
//  });

router.get("/", SiteController.getHomePage);

module.exports = router;