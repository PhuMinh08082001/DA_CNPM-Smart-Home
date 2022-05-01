const User = require('../models/userModel');
const Notification = require('../models/notificationModel')
const Report = require("../models/reportModel");

class APIController {
    requireLogin(req, res, next) {
        console.log(req.isAuthenticated());
        if (!req.isAuthenticated()) {
            return res.send({ loggedIn: false });
        }
        next();
    }
    
    //user management///////////////////////////
    getRole(req, res) {
        User.find({userName: req.body.email})
            .then((doc) => {
                console.log(doc)
                res.send({
                    loggedIn: true,
                    role: doc[0].role
                })
            })
    }
    getAllUsers(req, res) {
        User.find({})
            .then(function(doc) {
                res.send({
                    loggedIn: true,
                    data: doc})
            })
            .catch((err) => res.send(false))
    }

    addUser(req, res) {
        let newUser = new User({
            role: req.body.role,
            userName: req.body.userName,
            password: req.body.password
        })

        newUser.save()
            .then(() => res.send(true))
            .catch(err => res.send(false))
    }

    deleteUser(req, res) {
        let userID = req.body.userID
        console.log(req.body)
        User.deleteOne({_id: userID})
            .then(() => res.send(true))
            .catch(err => res.send(false))

    }
    /////////////////////////////////////////////

    // Notifications ////////////////////////////
    getAllNotifications(req, res) {
        Notification.find({}).sort({createdAt: 'desc'})
            .then((notifications) => {
                res.send(notifications)
            })
    }

    removeNotification(req, res) {
        let notificationID = req.body.notificationID
        Notification.deleteOne({_id: notificationID})
            .then(() => {res.send(true)})
            .catch(()=> res.send(false))
    }
    /////////////////////////////////////////////

    async getReportWeek(req, res) {
        var listReport;
        await Report.find({})
            .limit(7)
            .then((report) => {
                listReport = report;
            });
        return res.send(listReport);
    }

}

module.exports = new APIController();