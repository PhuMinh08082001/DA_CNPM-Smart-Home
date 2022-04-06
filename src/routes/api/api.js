var express = require('express');
var passport = require('passport');
var initPassportLocal = require('./passport');
const APIController = require('../../app/controllers/apiController')
var router = express.Router();
initPassportLocal();

router.get('/checkConnection', function (req, res) {
    res.send(true)
})

router.post('/login', passport.authenticate("local"), function(req, res) {
    res.send('logged in')
})

router.get('/checkLogin', APIController.requireLogin, function (req, res) {
    res.send({loggedIn: true})
} )

router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        return res.send('ok')
    });
})


router.get('/getAllUser', APIController.requireLogin, function (req, res) {
    APIController.getAllUsers(req, res)
});


router.post('/createUser', APIController.requireLogin, APIController.addUser)
router.post('/removeUser', APIController.requireLogin, APIController.deleteUser)
module.exports = router;