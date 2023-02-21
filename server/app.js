const express = require('express');
const app = express();
const PORT = 5050;
require('dotenv').config();
const mongoose = require('mongoose');

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))

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

app.listen(PORT, ()=>{
    console.log("server is running on sever", PORT);
})