
var express = require('express');
var router = express.Router();
const userController = require('../app/controllers/userController')

router.get('/', function (req, res) {
    userController.UserManage(req, res)
})

router.post('/addUser', userController.addNewUser)

router.post('/removeUser', userController.removeUser)



module.exports = router;