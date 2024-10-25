const express = require('express');
const accessKeyController = require('../controllers/accessKeyController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.post('/', auth.authorize(['ADMIN', 'TEACHER']), accessKeyController.createAccessKey);

module.exports = router;