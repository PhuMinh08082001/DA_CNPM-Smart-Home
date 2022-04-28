const mongoose = require("mongoose");

const device = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    value: {
        type: String,
    },
    dayTime: {
        type: String,
    },
});

module.exports = mongoose.model("device", device);