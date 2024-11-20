const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/profile', auth.authorize(['ADMIN', 'STUDENT', 'COLLABORATOR', 'TEACHER']), userController.getProfile);
router.post('/teacher', auth.authorize(['ADMIN']), userController.createTeacher);
router.get('/teachers', userController.getTeachers);
router.get('/instructor', userController.getInstructor);
router.put('/:id/change-role', auth.authorize(['ADMIN']), userController.changeRole);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', auth.authorize(['ADMIN', 'STUDENT', 'COLLABORATOR', 'TEACHER']), userController.updateUser);
router.delete('/:id', auth.authorize(['ADMIN', 'STUDENT', 'COLLABORATOR', 'TEACHER']), userController.deleteUser);

module.exports = router;