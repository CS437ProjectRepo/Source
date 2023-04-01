const express = require('express');
const multer = require('multer');
const router = express.Router();
const upload = multer();
const requireLogin = require('../middleware/auth-jwt');
const {projectFieldValidation} = require("../utils/validators");
const projectController = require("../controllers/projectController");


router.get('/allprojects', projectController.allprojects);

router.get('/', (req, res) => {
    res.sendFile(`/Users/anshitakhare/Documents/Project-Repository/server/drivetest.html`);
});

router.post('/createproject', projectFieldValidation, projectController.createproject);

router.post('/editproject', requireLogin,  projectController.updateProject);

router.post('/uploadfiletest', upload.any(), projectController.uploadFileTest);

module.exports = router