const lessonService = require('../services/lessonService');

class LessonController {

    async addLessionToCourse(req, res) {
        try {

        } catch (error) {
            res.status(400).json(error);
        }
    }

    async deleteLesson(req, res) {
        try {
            const courseId = req.params.id;
            const lessonId = req.params.lessonId;

            const course = await lessonService.deleteLesson(courseId, lessonId);

            if (course == null) {
                res.status(404).json({ success: false });
            }
            return res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async updateLesson(req, res) {
        try {
            const courseId = req.params.id;
            const lessonId = req.params.lessonId;
            const lesson = req.body;

            const course = await lessonService.updateLesson(courseId, lessonId, lesson);

            if (course == null) {
                res.status(404).json({ success: false });
            }
            return res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async publishLesson(req, res) {
        try {
            const courseId = req.params.id;
            const lessonId = req.params.lessonId;

            const course = await lessonService.publishLesson(courseId, lessonId);

            if (course == null) {
                res.status(404).json({ success: false });
            }
            return res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async unpublishLesson(req, res) {
        try {
            const courseId = req.params.id;
            const lessonId = req.params.lessonId;

            const course = await lessonService.unpublishLesson(courseId, lessonId);

            if (course == null) {
                res.status(404).json({ success: false });
            }
            return res.status(200).json(course);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}

module.exports = new LessonController();