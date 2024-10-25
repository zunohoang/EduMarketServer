const User = require('../models/User');
const userService = require('../services/userService');
const HTTP = require('../configs/httpStatusConfig');

class UserController {

    // lay danh sach user
    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    // tao user moi
    async createUser(req, res) {
        try {
            const data = req.body;
            // kiem tra xem cos username passsword, email, name k
            if (!data.username || !data.password || !data.email || !data.fullName) {
                throw new Error('Missing fields');
            }
            const user = await userService.createUser(data);
            res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // dang nhap
    async login(req, res) {
        try {
            console.log(req.body);
            const username = req.body.username;
            const password = req.body.password;
            const token = await userService.login(username, password);
            res.json({
                status: 'success',
                message: 'Login success',
                data: {
                    accesstoken: token
                }
            });
        } catch (error) {
            res.status(500).json({ status: "Server error", message: error.message });
        }
    }

    // update user
    async updateUser(req, res) {
        try {
            const data = req.body;
            const user = await userService.updateUser(data);
            if (!user) {
                throw new Error('User not found');
            }
            res.json(user);
        } catch (error) {
            res.status(HTTP.OK).json(error.message);
        }
    }

    // delete user
    async deleteUser(req, res) {
        try {
            const { username } = req.body;
            const user = await userService.deleteUser(username);
            if (!user) {
                throw new Error('User not found');
            }
            res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // doi role cho user
    async changeRole(req, res) {
        try {
            const { role, username } = req.body;
            const user = await userService.changeRole(username, role);
            res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // doi password
    async changePassword(req, res) {
        try {
            const { password } = req.body;
            const username = req.user.username;
            const user = await userService.changePassword(username, password);
            res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }

    // find user with field
    async findUser(req, res) {
        try {
            // get field
            const fields = req.query;
            const user = await userService.findUser(fields);
            res.json(user);
        } catch (error) {
            res.status(500).json(error.message);
        }
    }
}

module.exports = new UserController();
