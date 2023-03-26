const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("connected to mongo");
    } catch (error) {
        console.log(error)
    }
}

 module.exports = connectToDatabase;