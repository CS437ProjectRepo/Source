const mongoose = require('mongoose');
require('dotenv').config();

const connectToDatabase = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = connectToDatabase;