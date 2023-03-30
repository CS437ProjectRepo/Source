const app = require('../src/app')
require('dotenv').config()
const {connectToDatabase} = require("../config/mongoDbConfig");
connectToDatabase();
PORT = process.env.PORT || 5050

app.listen(PORT, ()=>{
    console.log("server is running on sever", PORT);
})