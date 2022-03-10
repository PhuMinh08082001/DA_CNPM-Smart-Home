const mongoose = require('mongoose');
require('dotenv').config()
const uri = process.env.MONGODB_URI;
console.log(uri)
async function connect() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    } catch (error) {
        console.log(error);
        console.log("Can't connect");
    }
}

module.exports = { connect };