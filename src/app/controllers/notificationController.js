const Notification = require("../models/notificationModel");
var fetch = require("node-fetch");

class NotificationController {
    allNotification(req, res) {
        Notification.find({})
            .sort({ createdAt: "desc" })
            .lean()
            .then((notifications) => {
                res.render("notification/notification", { notifications });
            });
    }

    addNotification(title, content, type) {
        let newNotification = new Notification({
            title: title,
            content: content,
            type: type,
        });

        newNotification.save().then().catch();
    }

    removeNotification(req, res) {
        let notificationID = req.body.notificationID;
        Notification.deleteOne({ _id: notificationID }).then(() => {
            res.redirect("/notification");
        });
    }

    checkGasConcen(notied) {
        //////////// check gas concentration
        setInterval(() => {
            // console.log(notied)
            fetch("https://io.adafruit.com/api/v2/DAFS/feeds/gas/data", {
                    method: "GET", // or 'PUT'
                })
                .then((response) => response.json())
                .then((data) => {
                    // console.log('Success:', data[0]);
                    if (data[0].value > 500) {
                        if (!notied.val) {
                            notied.val = true;
                            // console.log("notificated");
                            this.addNotification(
                                "Khí gas rò rỉ!",
                                "Nồng độ khí gas đo được vượt ngưỡng an toàn, vui lòng kiểm tra",
                                "danger"
                            );
                        }
                    } else {
                        if (notied.val) notied.val = false;
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }, 5000);
        /////////////////////////////////////
    }
}

module.exports = new NotificationController();