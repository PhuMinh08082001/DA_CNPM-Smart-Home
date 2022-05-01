const { use } = require("../../app");
const User = require("../models/userModel");

class UserController {
    addUser(req, res) {
        let newUser = new User({
            role: req.body.role,
            userName: req.body.userName,
            password: req.body.password,
        });

        newUser
            .save()
            .then(() => res.send("ok"))
            .catch((err) => {
                res.json(err);
            });
    }

    deleteUser(req, res) {
        let userID = req.body.userID;
        console.log(req.body);
        User.deleteOne({ _id: userID }).then(() => {
            res.send("deleted");
        });
    }

    getAllUsers(req, res) {
        User.find({})
            .then(function(doc) {
                res.send({
                    loggedIn: true,
                    data: doc,
                });
            })
            .catch((err) => res.send("dsf"));
    }

    getPageLogin(req, res, next) {
        res.render("users/login", { layout: false });
    }

    checkLogOut(req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect("/");
        }
        next();
    }

    // management ///////////////////
    UserManage(req, res) {
        User.find({})
            .sort({ _id: "desc" })
            .lean()
            .then(function(users) {
                res.render("management/user_management", { users });
            });
    }

    addNewUser(req, res) {
        let newUser = new User({
            role: req.body.role,
            userName: req.body.userName,
            password: req.body.password,
        });

        newUser
            .save()
            .then(() => res.redirect("/management"))
            .catch((err) => {
                res.json(err);
            });
    }

    removeUser(req, res) {
            let userID = req.body.userID;
            User.deleteOne({ _id: userID }).then(() => {
                res.redirect("/management");
            });
        }
        ////////////////////////////////
}

module.exports = new UserController();