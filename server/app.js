const express = require('express');
const app = express();
const PORT = 5050;
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGOURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(result =>{
    console.log('connected to mongo')
}).catch(err =>{
    console.log(err)
})

require('./models/userModel')
require('./models/projectModel')

app.use(express.json())
app.use(require('./routes/projectRoutes'))
app.use(require('./routes/UserRoutes'))

app.listen(process.env.PORT || PORT, ()=>{
    console.log("server is running on sever", process.env.PORT || PORT);
})