const User = require('../models/userModel');


class UserController {
    addUser(req, res) {
        let newUser = new User({
            fullName: req.body.fullName,
            userName: req.body.userName,
            password: req.body.password
        })

        newUser.save()
            .then(() => res.redirect('signup'))
            .catch(err => res.json(err))
    }
}

module.exports = new UserController();