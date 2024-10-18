const User = require('../models/UserModel');
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
            if (!data.username || !data.password || !data.email || !data.name) {
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

}

module.exports = new UserController();
