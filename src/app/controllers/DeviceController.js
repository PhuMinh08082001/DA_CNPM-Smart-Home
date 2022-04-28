const { json } = require("body-parser");
const Device = require("../models/deviceModel");
var fetch = require("node-fetch");
class DeviceController {
    fan(req, res, next) {
        res.render("devices/fan");
    }

    updateDevice(name, startDay, endDay) {
        fetch(
                `https://io.adafruit.com/api/v2/DAFS/feeds/${name}/data?start_time=${startDay}&end_time=${endDay}`, {
                    method: "GET", // or 'PUT'
                }
            )
            .then((response) => response.json())
            .then((data) => {
                var listDevice = data.map((device) => ({
                    id: device.id,
                    name: name,
                    value: device.value,
                    dayTime: device.created_at,
                }));
                console.log(listDevice);

                Device.insertMany(listDevice)
                    .then(function() {
                        console.log("Update Suceessfully");
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    updateAllDevice(startDay, endDay) {
        this.updateDevice("led", startDay, endDay);
        this.updateDevice("auto", startDay, endDay);
        this.updateDevice("fan", startDay, endDay);
        this.updateDevice("gas", startDay, endDay);
        this.updateDevice("humi", startDay, endDay);
        this.updateDevice("temp", startDay, endDay);
    }
}

module.exports = new DeviceController();