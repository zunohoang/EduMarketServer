const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const authController = require('../controllers/auth.controller')

router.post("/login", authController.login);

module.exports = router;