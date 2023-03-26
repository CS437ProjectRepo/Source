const express = require('express');
const router = express.Router();
const requireLogin = require('../middleware/requireLogin');
const projectController = require("../controllers/projectController");

router.get('/allposts', projectController.allPosts);

router.post('/createpost', projectController.createPost);

router.post('/editpost', requireLogin,  projectController.editPost)

module.exports = router