const express = require('express');
 const router = express.Router();
 const requireLogin = require('../middleware/requireLogin');
 const UserController = require("../controllers/userController")

 router.get('/protected', requireLogin, UserController.protectedRoute)

 router.post('/register', UserController.register)
 
 router.post('/login', UserController.login)

module.exports = router;