const courseService = require('../services/course.service');
const Course = require('../models/course.model');
const createMulter = require('../configs/multer.config');
const multer = createMulter('public/courses');
const uploadCourse = multer.single('file');
const User = require('../models/user.model');
const redisService = require('../services/redis.service');
class CourseController {

    static instance = new CourseController();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (CourseController.instance) return CourseController.instance;
        CourseController.instance = this;
    }

    async getCourses(req, res) {
        try {

            const teacherId = req.query.teacherId;
            let courses = [];
            let teacherName = "";
            if (!teacherId) {
                const cachedCourses = await redisService.get('courses::list');
                if (cachedCourses) {
                    console.log('Get courses from cache');
                    courses = JSON.parse(cachedCourses);
                } else {
                    console.log('Get courses from db');
                    courses = await Course.find().populate('instructor').select('-sections.lessons.url');
                    await redisService.set('courses::list', JSON.stringify(courses));
                }
            } else {
                courses = await Course.find({ instructor: teacherId }).populate('instructor').select('-sections.lessons.url');
                const teacher = await User.findById(teacherId);
                teacherName = teacher.fullName;
            }

            if (!courses) {
                res.status(404).json({
                    status: false,
                    message: "Khong tim thay khoa hoc nao"
                })
            } else {
                res.json({
                    status: true,
                    data: {
                        courses,
                        teacherName
                    }
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async createCourse(req, res) {
        uploadCourse(req, res, async (err) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else {
                const course = JSON.parse(req.body.course);
                console.log(course);
                if (req.file)
                    course.image = req.file.path.replace('public', '');
                try {
                    const courseDetail = await courseService.createCourse(course);
                    await redisService.del('courses::list');
                    if (courseDetail) {
                        res.json({
                            status: true,
                            data: {
                                course: courseDetail
                            }
                        })
                    } else {
                        res.status(500).json({
                            status: false,
                            message: "loi them vao"
                        })
                    }
                } catch (error) {
                    res.status(500).json({
                        status: false,
                        message: error.message
                    })
                }
            }
        });
    }

    async createCourseWithCloudinary(req, res) {
        uploadCourse(req, res, async (err) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else {
                const course = JSON.parse(req.body.course);
                console.log(course);
                if (req.file)
                    course.image = req.file.path.replace('public', '');
                try {
                    const courseDetail = await courseService.createCourse(course);

                    if (courseDetail) {
                        res.json({
                            status: true,
                            data: {
                                course: courseDetail
                            }
                        })
                    } else {
                        res.status(500).json({
                            status: false,
                            message: "loi them vao"
                        })
                    }
                } catch (error) {
                    res.status(500).json({
                        status: false,
                        message: error.message
                    })
                }
            }
        });
    }

    async deleteCourse(req, res) {
        try {
            const { id } = req.params;
            const course = await courseService.deleteCourse(id);
            await redisService.del('courses::list');
            if (course) {
                res.json({
                    status: true,
                    data: {
                        course
                    }
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "loi xoa"
                })
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async updateCourse(req, res) {
        uploadCourse(req, res, async (err) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else {
                const course = JSON.parse(req.body.course);
                if (req.file)
                    course.image = req.file.path.replace('public', '');
                try {
                    const courseDetail = await courseService.updateCourse(course);
                    await redisService.del('courses::list');
                    if (courseDetail) {
                        res.json({
                            status: true,
                            data: {
                                course: courseDetail
                            }
                        })
                    } else {
                        res.status(500).json({
                            status: false,
                            message: "loi cap nhat"
                        })
                    }
                } catch (error) {
                    res.status(500).json({
                        status: false,
                        message: error.message
                    })
                }
            }
        });
    }

    async getCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await courseService.getCourseById(req.user, id);
            if (course) {
                res.json({
                    status: true,
                    data: {
                        course
                    }
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "loi lay du lieu"
                })
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async getStudentsOfCourse(req, res) {
        try {
            const { id } = req.params;
            const students = await courseService.getStudentsOfCourse(id);
            const course = await courseService.getCourseById(id);
            if (students) {
                res.json({
                    status: true,
                    data: {
                        students: students.student,
                        course: {
                            _id: course._id,
                            name: course.name
                        }
                    }
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "loi lay du lieu"
                })
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async removeStudentFromCourse(req, res) {
        try {
            const { id, studentId } = req.params;
            const course = await Course.findById(id);
            course.student = course.student.filter(s => s != studentId);
            await course.save();

            // xoa khỏi courrseJoined của student
            const student = await User.findById({ _id: studentId });
            student.coursesJoined = student.coursesJoined.filter(c => c != id);
            await student.save();
            await redisService.del('courses::list');
            res.json({
                status: true,
                data: {
                    course
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async addStudentToCourse(req, res) {
        try {
            const { id, studentId } = req.params;
            const course = await Course.findById(id);
            course.student.push(studentId);
            await course.save();
            await redisService.del('courses::list');
            res.json({
                status: true,
                data: {
                    course
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async publicCourseById(req, res) {
        try {
            const { id } = req.params;
            console.log(id);
            const course = await courseService.publicCouseById(id);
            await redisService.del('courses::list');
            if (course) {
                res.json({
                    status: true,
                    data: {
                        course
                    }
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "loi"
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error
            })
        }
    }

    async unpublicCourseById(req, res) {
        try {
            const { id } = req.params;
            const course = await courseService.unpublicCourseById(id);
            await redisService.del('courses::list');
            if (course) {
                res.json({
                    status: true,
                    data: {
                        course
                    }
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "loi"
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error
            })
        }
    }

    async getCourseOfUsername(req, res) {
        try {

            const { username } = req.params;
            const user = await User.findOne({ username }).populate('coursesJoined');
            if (user.coursesJoined) {
                return res.json({
                    status: true,
                    data: {
                        user: user
                    }
                })
            } else {
                return res.status(500).json({
                    status: false,
                    message: "loi"
                })
            }

        } catch (error) {
            return res.status(500).json({
                status: false,
                message: error
            })
        }
    }
}

module.exports = CourseController.getInstance();