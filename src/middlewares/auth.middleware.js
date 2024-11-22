const jwt = require('../services/jwt.service');
const User = require('../models/user.model');
const logger = require('../utils/logger');

class Auth {
    static instance = new Auth();

    static getInstance() {
        return this.instance;
    }

    static attributes = new Set();

    constructor() {
        if (Auth.instance) return Auth.instance;
        Auth.instance = this;
    }

    addAttributes(attributes) {
        attributes.forEach(attr => Auth.attributes.add(attr));
    }

    async hasAttributes(req, res, next, requiredAttributes) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            console.log(token);
            const user_token = jwt.verifyToken(token);

            const user = await User.findOne({ username: user_token.username });

            logger(this, `User ${user.username} is accessing - ROLE: ${user.role}`);

            if (requiredAttributes.some(attr => user.role.includes(attr))) {
                req.user = user;
                return next();
            } else {
                return res.status(403).json({ status: false, message: 'Forbidden' });
            }
        } catch (error) {
            return res.status(401).json({ status: false, message: 'Unauthorized' });
        }
    }

    async setUserDetail(req, res, next) {
        try {
            const token = req.headers['authorization'].split(' ')[1];

            if (!token) return next();
            if (!jwt.verifyToken(token)) return next();

            const user_token = jwt.verifyToken(token);
            const user = await User.findOne({ username: user_token.username });
            if (!user) return next();
            req.user = user;
            return next();
        } catch (e) {
            return next();
        }
    }

    authorize(roles) {
        return (req, res, next) => this.hasAttributes(req, res, next, roles);
    }
}

module.exports = Auth.getInstance();
