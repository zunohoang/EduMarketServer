const Course = require('../models/course.model');
const User = require('../models/user.model');

class CourseService {
    constructor() {
    }

    async getCourses() {
        return await Course.find().populate('instructor');
    }
    async getCourseById(id) {
        return await Course.findById(id);
    }
    async createCourse(course) {
        return await Course.create(course);
    }
    async updateCourse(course) {
        return await Course.findByIdAndUpdate(course._id, course, { new: true });
    }
    async deleteCourse(id) {
        return await Course.findByIdAndDelete(id);
    }

    async getStudentsOfCourse(id) {
        return await Course.findById(id).populate('student').select('student');
    }

    async publicCouseById(id) {
        return await Course.findOneAndUpdate({ _id: id }, { status: true }, { new: true });
    }

    async unpublicCourseById(id) {
        return await Course.findOneAndUpdate({ _id: id }, { status: false }, { new: true });
    }

    async addStudentToCourse(courseId, studentId) {
        try {
            const course = await Course.findByIdAndUpdate(courseId, { $push: { student: studentId } }, { new: true });
            const user = await User.findByIdAndUpdate(studentId, { $push: { coursesJoined: courseId } }, { new: true });
            if(!course || !user) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CourseService();