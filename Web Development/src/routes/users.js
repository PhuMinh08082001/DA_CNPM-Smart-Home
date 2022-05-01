var express = require('express');
const { route } = require('../app');
var router = express.Router();
var passport = require('passport');
var initPassportLocal = require('../app/middlewares/passport');
const userController = require('../app/controllers/userController')

// Init all passport
initPassportLocal();

// router.get('/users/login', function (req, res) {
//  res.render('users/login', {layout: false});
// });

router.get('/users/login', userController.checkLogOut, userController.getPageLogin);

router.post("/users/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
    successFlash: true,
    failureFlash: true
}));

    /* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup')
});

router.post('/signup', userController.addUser);

router.get('/users/logout', function (req, res, next) {
     req.session.destroy(function(err) {
        return res.redirect('/users/login');
    });
})
module.exports = router;