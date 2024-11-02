const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/teacher', userController.createTeacher);
router.get('/teachers', userController.getTeachers);
router.get('/instructor', userController.getInstructor);
router.put('/:id/change-role', userController.changeRole);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;