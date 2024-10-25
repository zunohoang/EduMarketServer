const express = require('express');
const courseController = require('../controllers/courseController');
const lessonController = require('../controllers/lessonController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.post('/', auth.authorize(['ADMIN', 'TEACHER']), courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', auth.authorize(['ADMIN']), courseController.updateCourse);
router.delete('/:id', auth.authorize(['ADMIN']), courseController.deleteCourse);
router.put('/:id/publish', auth.authorize(['ADMIN']), courseController.publishCourse);
router.put('/:id/unpublish', auth.authorize(['ADMIN']), courseController.unpublishCourse);
router.put('/:id/lesson', auth.authorize(['ADMIN']), courseController.createLesson);
router.delete('/:id/lesson/:lessonId', auth.authorize(['ADMIN', "TEACHER"]), lessonController.deleteLesson);
router.put('/:id/lesson/:lessonId', auth.authorize(['ADMIN', "TEACHER"]), lessonController.updateLesson);
router.put('/:id/lesson/:lessonId/publish', auth.authorize(['ADMIN', "TEACHER"]), lessonController.publishLesson);
router.put('/:id/lesson/:lessonId/unpublish', auth.authorize(['ADMIN', "TEACHER"]), lessonController.unpublishLesson);

module.exports = router;