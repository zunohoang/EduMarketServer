const Course = require('../models/course.model');
const User = require('../models/user.model');

class CourseService {

    static instance = new CourseService();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (CourseService.instance) return CourseService.instance;
        CourseService.instance = this;
    }

    async getCourses() {
        return await Course.find().populate('instructor').select('-sections.lessons.url');
    }
    async getCourseById(user, id) {
        if (user) {
            console.log(user);
            if (user.coursesJoined.includes(id) || user.role == 'ADMIN' || user.role == 'TEACHER' || user.role == 'COLLABORATOR') {
                return await Course.findById(id).populate('instructor');
            }
        }
        return await Course.findById(id).populate('instructor').select('-sections.lessons.url');
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
            if (!course || !user) {
                return false;
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CourseService.getInstance();