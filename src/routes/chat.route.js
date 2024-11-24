const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth.setUserDetail, chatController.getChats);

module.exports = router;