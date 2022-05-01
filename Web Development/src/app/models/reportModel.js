const mongoose = require("mongoose");

const report = new mongoose.Schema({
    temperature: {
        type: String,
    },
    humidity: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("report", report);