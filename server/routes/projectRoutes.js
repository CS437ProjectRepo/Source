const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/auth-jwt')
const ProjectController = require("../controllers/projectController")
const {projectFieldValidation} = require("../utils/validators")

router.get('/getAllProjects', ProjectController.getAllProjects)
router.get('/getFavoriteProjects', ProjectController.getFavoriteProjects)
router.post('/createProject', requireLogin, projectFieldValidation, ProjectController.createProject)
router.post('/updateProject', requireLogin, ProjectController.updateProject)

module.exports = router