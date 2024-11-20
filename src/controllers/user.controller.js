const userService = require("../services/user.service");
const UserService = require("../services/user.service");
const createMulter = require('../configs/multerConfig');
const multer = createMulter('public/teachers');
const uploadCourse = multer.single('file');
const jwtService = require('../services/jwt.service');
const redisService = require('../services/redis.service');

class UserController {

    async createUser(req, res) {
        try {
            let { username, name, image, phone, address, born, email, password, role } = req.body;
            if (!role) {
                role = "STUDENT";
            }
            const user = await UserService.createUser({ username, fullName: name, image, phone, address, born, email, password, role });
            if (user) {
                res.status(201).json({ status: true, message: 'User created successfully' });
            } else {
                res.status(400).json({ status: false, message: 'User creation failed' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, username, password } = req.body;
            let user = null;
            if (email) {
                user = await UserService.getUserByEmail({ email });
            }
            if (username) {
                user = await UserService.getUserByUsername({ username });
            }
            if (user) {
                if (user.password === password) {
                    user.password = undefined;
                    user.coursesJoined = undefined;
                    console.log("USER LOGIN ", user.fullName);
                    const accesstoken = jwtService.genAccessToken({ user });
                    res.status(200).json({ status: true, data: { user, accesstoken } });
                } else {
                    res.status(400).json({ status: false, message: 'Password is incorrect' });
                }
            } else {
                res.status(400).json({ status: false, message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById({ id });
            if (user) {
                res.status(200).json({ status: true, data: user });
            } else {
                res.status(400).json({ status: false, message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

    async updateUser(req, res) {
        try {
            const { id, username, fullName, image, phone, address, age, email, password } = req.body;
            const user = await UserService.updateUser({ id, username, fullName, image, phone, address, age, email, password });
            if (user) {
                res.status(200).json({ status: true, message: 'User updated successfully' });
            } else {
                res.status(400).json({ status: false, message: 'User update failed' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

    async getUsers(req, res) {
        try {
            let users = null;
            if (req.query.role) {
                users = await UserService.getUsersByRole(req.query.role);
            }
            else users = await UserService.getUsers();
            res.json({
                status: true,
                data: {
                    users: users
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.deleteUser(id);
            console.log(user);
            if (!user) {
                res.status(404).json({
                    status: false,
                    message: "khong tim thay nguoi dung"
                });
            } else {
                res.json({
                    status: true,
                    data: {
                        user
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

    async getInstructor(req, res) {
        try {
            const instructors = await UserService.getInstructor();

            if (instructors) {
                return res.json({
                    status: true,
                    data: {
                        instructors
                    }
                })
            }
        } catch (error) {
            return res.json("rrr");
        }
    }

    async getTeachers(req, res) {
        try {
            const cachedCourses = await redisService.get("teachers::list");
            if (cachedCourses) {
                return res.json({
                    status: true,
                    data: {
                        teachers: JSON.parse(cachedCourses)
                    }
                })
            }
            const teachers = await UserService.getTeachers();
            await redisService.set("teachers::list", JSON.stringify(teachers));
            if (teachers) {
                return res.json({
                    status: true,
                    data: {
                        teachers
                    }
                })
            }
        } catch (error) {
            return res.json("rrr");
        }
    }

    async createTeacher(req, res) {
        uploadCourse(req, res, async (err) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else {
                const teacher = JSON.parse(req.body.teacher);
                console.log(teacher);
                let { username, name, image, phone, address, born, email, password, description } = teacher;
                if (req.file) image = req.file.path.replace('public', '');
                const user = await UserService.createUser({ username, fullName: name, avt: image, phone, address, born, email, password, role: "TEACHER", description });
                if (user) {
                    res.status(201).json({ status: true, message: 'Teacher created successfully' });
                } else {
                    res.status(400).json({ status: false, message: 'Teacher creation failed' });
                }
            }
        });
    }

    async changeRole(req, res) {
        try {
            const id = req.params.id;
            const role = req.body.role;

            console.log("ID", id);
            console.log("ROLE", role);

            const user = await UserService.changeRole(id, role);

            if (user) {
                res.json({
                    status: true,
                    data: {
                        user
                    }
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: "Khong tim thay nguoi dung"
                })
            }

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async getProfile(req, res) {
        try {
            const user = req.user;
            await user.populate('coursesJoined');
            res.json({
                status: true,
                data: {
                    user
                }
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }
}

module.exports = new UserController();
