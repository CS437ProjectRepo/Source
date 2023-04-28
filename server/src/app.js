const express = require('express');
const app = express();
const cors = require('cors');


require('../models/userModel')
require('../models/projectModel')


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(require('../routes/projectRoutes'))
app.use(require('../routes/userRoutes'))

module.exports = app