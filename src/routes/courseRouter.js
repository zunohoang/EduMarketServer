const express = require('express');
const courseController = require('../controllers/courseController');
const router = express.Router();
const auth = require('../middlewares/authMiddlewares');

router.post('/', auth.authorize(['admin']), courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', auth.authorize(['admin']), courseController.updateCourse);
router.delete('/:id', auth.authorize(['admin']), courseController.deleteCourse);
router.put('/:id/publish', auth.authorize(['admin']), courseController.publishCourse);
router.put('/:id/unpublish', auth.authorize(['admin']), courseController.unpublishCourse);
router.put('/:id/lesson', auth.authorize(['admin']), courseController.createLesson);

module.exports = router;