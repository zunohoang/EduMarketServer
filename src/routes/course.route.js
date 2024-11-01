const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller')

router.get('/:id', courseController.getCourseById);
router.get('/', courseController.getCourses);
router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);
router.get('/:id/students', courseController.getStudentsOfCourse);
router.delete('/:id/students/:studentId', courseController.removeStudentFromCourse);
router.post('/:id/students/:studentId', courseController.addStudentToCourse);
router.put('/:id/public', courseController.publicCourseById);
router.put('/:id/unpublic', courseController.unpublicCourseById);

module.exports = router;