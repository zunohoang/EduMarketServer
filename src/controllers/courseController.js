const Course = require("../models/Course");
const HTTP = require('../configs/httpStatusConfig');
const courseSevice = require('../services/courseService');

class CourseController {

    // [GET] /courses
    async getAllCourses(req, res) {
        try {
            const courses = await courseSevice.getAllCourses();
            return res.status(HTTP.OK).json(courses);
        } catch {
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // [GET] /courses/:id
    async getCourseById(req, res) {
        try {
            const course = await courseSevice.getCourseById(req.params.id);
            return res.status(HTTP.OK).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [POST] /courses
    async createCourse(req, res) {
        try {
            const course = await courseSevice.createCourse(req.body, req.user);
            return res.status(HTTP.CREATED).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [DELETE] /courses/:id
    async deleteCourse(req, res) {
        try {
            const course = await courseSevice.deleteCourse(req.params.id);
            return res.status(HTTP.OK).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [PUT] /courses/:id
    async updateCourse(req, res) {
        try {
            const course = await courseSevice.updateCourse(req.params.id, req.body);
            return res.status(HTTP.OK).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [PUT] /courses/:id/publish
    async publishCourse(req, res) {
        try {
            const course = await courseSevice.publishCourse(req.params.id, req.user);
            return res.status(HTTP.OK).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [PUT] /courses/:id/unpublish
    async unpublishCourse(req, res) {
        try {
            const course = await courseSevice.unpublishCourse(req.params.id);
            return res.status(HTTP.OK).json(course);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    // [PUT] /courses/:id/lesson
    async createLesson(req, res) {
        try {
            const lesson = await courseSevice.createLesson(req.params.id, req.body);
            return res.status(HTTP.OK).json(lesson);
        } catch (error) {
            return res.status(HTTP.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}

module.exports = new CourseController;