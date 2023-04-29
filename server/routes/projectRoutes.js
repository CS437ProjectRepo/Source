const express = require('express');
const multer = require('multer');
const requireLogin = require('../middleware/auth-jwt');
const {projectFieldValidation} = require("../utils/validators");
const projectController = require("../controllers/projectController");

const router = express.Router();
const upload = multer();

router.get('/allprojects', projectController.allProjects);

router.get('/project', projectController.singleProject);

router.post('/createproject',  requireLogin, upload.any(), projectFieldValidation, projectController.createProject);

router.post('/editproject', requireLogin, upload.any(), projectController.updateProject);

router.get('/download/projects', projectController.downloadProjects);

router.post('/deleteproject', requireLogin, projectController.deleteProject);

module.exports = router