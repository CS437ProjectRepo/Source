const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5050;

const databaseConnection = require("./config/mongoDbConfig");

databaseConnection();

require('./models/userModel')
require('./models/projectModel')

app.use(express.json())
app.use(require('./routes/projectRoutes'))
app.use(require('./routes/UserRoutes'))

app.listen(process.env.PORT || PORT, ()=>{
    console.log("server is running on sever", process.env.PORT || PORT);
})