const express = require('express');
const multer = require('multer');
const requireLogin = require('../middleware/auth-jwt');
const {projectFieldValidation} = require("../utils/validators");
const projectController = require("../controllers/projectController");

const router = express.Router();
const upload = multer();

router.get('/allprojects', projectController.allProjects);

router.get('/project', projectController.singleProject);

router.get('/', (req, res) => {
    res.sendFile(`/Users/anshitakhare/Documents/Project-Repository/server/drivetest.html`);
});

router.post('/createproject',  requireLogin, upload.any(), projectFieldValidation, projectController.createProject);
// router.post('/createproject', requireLogin,  upload.any(), projectFieldValidation, projectController.createProject);

router.post('/editproject', requireLogin,  projectController.updateProject);

router.post('/uploadfiletest', upload.any(), projectController.uploadFileTest);

router.get('/download/projects', projectController.downloadProjects);

router.post('/deleteproject', requireLogin, projectController.deleteProject);

module.exports = router