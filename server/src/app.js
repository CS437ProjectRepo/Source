const express = require('express');
const app = express();
const cors = require('cors');


require('../models/userModel')
require('../models/projectModel')


app.use(cors({
    origin: [
        "https://localhost:3000", 
        "https://term-project-repository.onrender.com"
    ]
}));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(require('../routes/projectRoutes'))
app.use(require('../routes/userRoutes'))

module.exports = app