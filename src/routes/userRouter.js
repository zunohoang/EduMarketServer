const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares')

router.get('/', auth.hasAttributes(req, res, ['ADMIN, TEACHER']), userController.getAllUsers);
router.post('/login', userController.login);
router.post('/', userController.createUser);
router.put('/', auth.hasAttributes(req, res, ['STUDENT', 'ADMIN', "TEACHER"]), userController.updateUser);
router.delete('/', auth.hasAttributes(req, res, ['ADMIN']), userController.deleteUser);

module.exports = router;