const UserService = require("../user.service");
const User = require("../../models/user.model");

class UserServiceImpl extends UserService {
    constructor(User) {
        super();
        this.User = User;
    }

    async getAllUsers() {
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

    async deleteUser(data) {
        return await this.User.findByIdAndDelete(data.id);
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
}