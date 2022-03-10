const mongoose = require('mongoose');


const user = new mongoose.Schema({
    fullName: {
        type: String
    },
    userName: {
        type: String
    },
    password: {
        type: String
    },
});

module.exports = User = mongoose.model('user', user);