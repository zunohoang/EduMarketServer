const jwt = require('../services/jwtService');

class Auth {
    // Singleton instance
    static instance = new Auth();

    static getInstance() {
        return this.instance;
    }

    // Biến static cho các attributes
    static attributes = new Set();

    constructor() {
        if (Auth.instance) return Auth.instance;
        Auth.instance = this;
    }

    // Thêm các thuộc tính vào Set để tránh trùng lặp
    addAttributes(attributes) {
        attributes.forEach(attr => Auth.attributes.add(attr));
    }

    // Kiểm tra xem người dùng có thuộc tính này không
    hasAttributes(req, res, next, requiredAttributes) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const user = jwt.verifyToken(token);

            // Kiểm tra user.role có ít nhất một quyền phù hợp với requiredAttributes
            if (requiredAttributes.some(attr => user.role.includes(attr))) {
                return next();
            } else {
                return res.status(403).json({ status: false, message: 'Forbidden' });
            }
        } catch (error) {
            return res.status(401).json({ status: false, message: 'Unauthorized' });
        }
    }

    // Middleware để kiểm tra quyền hạn trực tiếp
    authorize(roles) {
        return (req, res, next) => this.hasAttributes(req, res, next, roles);
    }
}

module.exports = Auth.getInstance();
