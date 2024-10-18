const jwt = require('../services/jwtService')
// xác thực người dùng
class Auth {
    // singleton pattern
    static instance = new Auth();

    static getInstance() {
        return this.instance;
    }

    // bien static dung chung cho các auth
    static attributes = [];

    // Phương thức khởi tạo riêng tư để ngăn chặn việc tạo thêm các đối tượng
    constructor() {
        if (Auth.instance) {
            return Auth.instance;
        }
        Auth.instance = this;
    }

    // Thêm các thuộc tính vào mảng attributes
    addAttributes(attributes) {
        Auth.attributes.push(...attributes);
    }

    // Kiểm tra xem người dùng có thuộc tính này không
    hasAttributes(req, res, attribute) {
        const user = jwt.verifyToken(req.headers['authorization'].split(' ')[1]);
        if (user.role.includes(attribute)) {
            next(req, res);
        } else {
            return res.status(403).json({ status: false, message: 'Forbidden' });
        }
    }

}

module.exports = Auth.getInstance();