const Course = require('../models/Course');
const HTTP = require('../configs/httpStatusConfig');
const mongoose = require('mongoose');

class CourseService {

    // get all courses
    async getAllCourses() {
        try {
            const courses = await Course.find();
            return courses;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // get course by id
    async getCourseById(id) {
        try {
            const course = await Course.findById(id);
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // create course
    async createCourse(data, userCreate) {
        try {
            const course = new Course({
                title: data.title,
                description: data.description,
                price: data.price,
                instructor: userCreate.id,
                category: data.category,
                image: data.image,
                rating: data.rating,
                students: data.students,
                lessons: data.lessons,
                isPublished: data.isPublished,
                publishedAt: data.publishedAt,
                publishedBy: data.isPublished ? userCreate.id : null,
            });
            course.save();
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // publish course
    async publishCourse(id, userPublish) {
        try {
            const course = await Course.findById(id);
            if (!course) {
                return { status: false, message: 'Course not found' };
            }
            course.isPublished = true;
            course.publishedAt = new Date();
            course.publishedBy = userPublish.id;
            course.save();
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // unpublish course
    async unpublishCourse(id) {
        try {
            const course = await Course.findById(id);
            if (!course) {
                return { status: false, message: 'Course not found' };
            }
            course.isPublished = false;
            course.publishedAt = null;
            course.publishedBy = null;
            course.save();
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // delete course
    async deleteCourse(id) {
        try {
            const course = await Course.findByIdAndDelete(id);
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // add lesson to course
    async addLesson(id, lesson) {
        try {
            const course = await Course.findById(id);
            if (!course) {
                return { status: false, message: 'Course not found' };
            }
            course.lessons.push(lesson);
            course.save();
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    // update course
    async updateCourse(id, data) {
        try {
            const course = await Course.findByIdAndUpdate(id, data, { new: true });
            return course;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new CourseService;