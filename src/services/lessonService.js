const Course = require('../models/Course');

class LessonService {

    async deleteLesson(courseId, lessonId) {
        try {
            const course = Course.updateOne(
                { _id: courseId },
                { $pull: { lessons: { _id: lessonId } } }
            );

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async publishLesson(courseId, lessonId) {
        try {
            const result = await Course.updateOne(
                { _id: courseId, "lessons._id": lessonId },
                { $set: { "lessons.$.isPublished": true } }
            );

            if (result.nModified === 0) {
                throw new Error('Lesson not found or already published');
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateLesson(courseId, lessonId, lesson) {
        try {
            const course = Course.updateOne(
                { _id: courseId, "lessons._id": lessonId },
                { $set: { "lessons.$": lesson } }
            );

            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async unpublishLesson(courseId, lessonId) {
        try {
            const result = await Course.updateOne(
                { _id: courseId, "lessons._id": lessonId },
                { $set: { "lessons.$.isPublished": false } }
            );

            if (result.nModified === 0) {
                throw new Error('Lesson not found or already unpublished');
            }

            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new LessonService();