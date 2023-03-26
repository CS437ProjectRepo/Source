const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const {projectFieldValidation} = require("../utils/validators");
const projectController = require("../controllers/projectController");

router.get('/allprojects', projectController.allprojects);

router.post('/createproject', projectFieldValidation, projectController.createproject);

router.post('/editproject', requireLogin,  projectController.updateProject)

module.exports = router