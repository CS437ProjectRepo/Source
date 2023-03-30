const express = require('express');
const app = express();
const PORT = 5050
require('../models/userModel')
require('../models/projectModel')
app.use(express.json())
app.use(require('../routes/projectRoutes'))
app.use(require('../routes/userRoutes'))

module.exports = app