const UserService = require("../services/user.service");

class UserController {

    async register(req, res) {
        try {
            const { username, fullName, image, phone, address, age, email, password } = req.body;
            const user = await UserService.createUser({ username, fullName, image, phone, address, age, email, password });
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
            const user = null;
            if (email) {
                user = await UserService.getUserByEmail({ email });
            }
            if (username) {
                user = await UserService.getUserByUsername({ username });
            }
            if (user) {
                if (user.password === password) {
                    res.status(200).json({ status: true, message: 'Login successfully' });
                } else {
                    res.status(400).json({ status: false, message: 'Password is incorrect' });
                }
            } else {
                res.status(400).json({ status: false, message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: error.message });
        }
    }

    async getUser(req, res) {
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
}

module.exports = new UserController();
