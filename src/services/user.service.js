const User = require("../models/user.model");

class UserService {
    constructor() {
        this.User = User;
    }

    async getUsers() {
        return await this.User.find();
    }

    async createUser(data) {
        return await this.User.create(data);
    }

    async updateUser(data) {
        const updateData = {};
        for (const key in data) {
            if (data[key] !== null && data[key] !== undefined) {
                updateData[key] = data[key];
            }
        }
        return await this.User.findByIdAndUpdate(data.id, updateData, { new: true });
    }

    async deleteUser(id) {
        return await this.User.findByIdAndDelete(id);
    }

    async getUserById(data) {
        return await this.User.findById(data.id);
    }

    async getUserByEmail(data) {
        return await this.User.findOne({ email: data.email });
    }

    async getUserByUsername(data) {
        return await this.User.findOne({ username: data.username });
    }

    async getInstructor() {
        return await this.User.find({ role: { $in: ["TEACHER"] } });
    }

    async getTeachers() {
        return await this.User.aggregate([
            {
                $match: { role: "TEACHER" }
            },
            {
                $lookup: {
                    from: "courses",            // Tên collection chứa các khóa học
                    localField: "_id",          // id của User
                    foreignField: "instructor", // trường instructor trong Course
                    as: "courseManagement"      // tên trường mới để lưu danh sách khóa học
                }
            },
            {
                $project: {
                    "courseManagement.sections": 0,
                    "password": 0
                }
            }
        ]);
    }

    async getUsersByRole(role) {
        return await this.User.find({ role }).populate({
            path: 'coursesJoined',
            select: '-sections',
            populate: {
                path: 'instructor',
                select: 'fullName _id email'
            }
        })
            .select('-password');
    }
}

module.exports = new UserService();