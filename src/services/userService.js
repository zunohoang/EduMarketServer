const User = require('../models/UserModel');
const JwtService = require('./jwtService');

class UserService {
    // Lay danh sach user
    async getAllUsers() {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    }

    // tao user moi
    async createUser(data) {
        try {
            const user = new User({
                name: data.name,
                username: data.username,
                password: data.password,
                email: data.email,
            });
            user.save();
            return user;
        } catch (error) {
            throw error;
        }
    }

    // đăng nhập
    async login(username, password) {
        try {
            const user = await User.findOne({ username, password });
            if (!user) {
                throw new Error('User not found');
            }
            const token = JwtService.genarateToken({ username, role: user.role });
            return token;
        } catch (error) {
            throw error;
        }
    }

    // update user
    async updateUser(data) {
        try {
            const user = await User.findOneAndUpdate({ username: data.username }, data, { new: true });
            return user;
        } catch (error) {
            throw error;
        }
    }

    // delete user 
    async deleteUser(username) {
        try {
            const user = User.deleteOne({ username });
            return user;
        }
    }
}

module.exports = new UserService();