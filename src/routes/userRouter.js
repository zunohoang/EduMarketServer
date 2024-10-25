const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.get('/', auth.authorize(['ADMIN', 'TEACHER']), userController.getAllUsers);
router.post('/login', userController.login);
router.post('/', userController.createUser);
router.put('/', auth.authorize(['STUDENT', 'ADMIN', 'TEACHER']), userController.updateUser);
router.delete('/', auth.authorize(['ADMIN']), userController.deleteUser);
router.put('/change-role', auth.authorize(['ADMIN']), userController.changeRole);
router.put('/change-password', auth.authorize(['STUDENT', 'ADMIN', 'TEACHER']), userController.changePassword);
router.get('/search', userController.findUser);

module.exports = router;