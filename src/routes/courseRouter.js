const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.post('/', auth.authorize(['ADMIN']), courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', auth.authorize(['ADMIN']), courseController.updateCourse);
router.delete('/:id', auth.authorize(['ADMIN']), courseController.deleteCourse);
router.put('/:id/publish', auth.authorize(['ADMIN']), courseController.publishCourse);
router.put('/:id/unpublish', auth.authorize(['ADMIN']), courseController.unpublishCourse);
router.put('/:id/lesson', auth.authorize(['ADMIN']), courseController.createLesson);

module.exports = router;