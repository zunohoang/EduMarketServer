const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')
const auth = require('../middlewares/auth.middleware');

router.get('/:id', auth.setUserDetail, courseController.getCourseById);
router.get('/', courseController.getCourses);
router.post('/', auth.authorize(['ADMIN']), courseController.createCourse);
router.put('/:id', auth.authorize(['ADMIN', 'TEACHER']), courseController.updateCourse);
router.delete('/:id', auth.authorize(['ADMIN', 'TEACHER']), courseController.deleteCourse);
router.get('/:id/students', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), courseController.getStudentsOfCourse);
router.delete('/:id/students/:studentId', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), courseController.removeStudentFromCourse);
router.post('/:id/students/:studentId', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), courseController.addStudentToCourse);
router.put('/:id/public', auth.authorize(['ADMIN']), courseController.publicCourseById);
router.put('/:id/unpublic', auth.authorize(['ADMIN']), courseController.unpublicCourseById);

module.exports = router;