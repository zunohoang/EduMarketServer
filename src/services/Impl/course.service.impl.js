const CourseService = require('../course.service');


class CourseServiceImlp extends CourseService {
    constructor(Course) {
        super();
        this.Course = Course;
    }

    async getCourseList() {
        return await this.Course.find();
    }
    async getCourseDetail(id) {
        return await this.Course.findById(id);
    }
    async createCourse(course) {
        return await this.Course.create(course);
    }
    async updateCourse(id, course) {
        const updateData = {};
        for (const key in course) {
            if (course[key] !== null && course[key] !== undefined) {
                updateData[key] = course[key];
            }
        }
        return await this.Course.findByIdAndUpdate(id, updateData, { new: true });
    }
    async deleteCourse(id) {
        return await this.Course.findByIdAndDelete(id);
    }
}

module.exports = new CourseServiceImlp();