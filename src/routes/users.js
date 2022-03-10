var express = require('express');
var router = express.Router();

const userController = require('../app/controllers/userController')
    /* GET users listing. */
router.get('/signup', function(req, res, next) {
    res.render('users/signup')
});

router.post('/signup', userController.addUser);
module.exports = router;