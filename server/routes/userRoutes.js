const express = require("express");
const router = express.Router();
const requireLogin = require("../middleware/auth-jwt");
const UserController = require("../controllers/userController");
const {ROUTES} = require('../utils/server.constants')

router.post(ROUTES.USER_LOGIN, UserController.login);
router.get(ROUTES.USER_PROTECTED, requireLogin, UserController.protectedRoute);
router.post(ROUTES.USER_CHANGE_PASSWORD, requireLogin, UserController.changePassword);
router.post(ROUTES.USER_FORGOT_PASSWORD, requireLogin, UserController.forgotPassword);
router.post(ROUTES.USER_REGISTER, UserController.register);
module.exports = router;