const User = require('../models/User');
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
            // Kiểm tra xem người dùng với username hoặc email đã tồn tại hay chưa
            const existingUser = await User.findOne({
                $or: [
                    { username: data.username },
                    { email: data.email }
                ]
            });

            if (existingUser) {
                throw new Error('Username hoặc email đã tồn tại');
            }

            const user = new User({
                fullName: data.fullName,
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
            const token = JwtService.genarateToken({ username, role: user.role, fullName: user.fullName, email: user.email, id: user._id });

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
        } catch (error) {
            throw error;
        }
    }

    // doi role cho user
    async changeRole(username, role) {
        try {
            const user = await User.findOneAndUpdate({ username }, { role }, { new: true });

            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            throw error;
        }
    }

    // doi password
    async changePassword(username, password) {
        try {
            const user = await User.findOneAndUpdate({ username }, { password }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    // tim kiem theo field
    async findUser(field) {
        try {
            const users = await User.find(field).select('-password');
            if (!users) {
                throw new Error('User not found');
            }
            return users;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserService();