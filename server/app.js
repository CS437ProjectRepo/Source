const express = require('express');
const app = express();
const PORT = 5050

const databaseConnection = require("./config/mongoDbConfig");
databaseConnection();

require('./models/userModel')
require('./models/projectModel')

app.use(express.json())
app.use(require('./routes/projectRoutes'))
 app.use(require('./routes/userRoutes'))

app.listen(PORT, ()=>{
    console.log("server is running on sever", PORT);
})