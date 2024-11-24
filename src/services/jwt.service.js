const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretdvdsvds-wf9ef09--90i90u';

// no co accesstoken and refreshtoken
class JwtService {

    static instance = new JwtService();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (JwtService.instance) return JwtService.instance;
        JwtService.instance = this;
    }

    // gen accestoken
    genAccessToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    }

    // gen refreshtoken
    genRefreshToken(payload) {
        return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
    }

    // verify token
    verifyToken(token) {
        return jwt.verify(token, JWT_SECRET);
    }

    // decode token
    decodeToken(token) {
        return jwt.decode(token);
    }

    // get token from header
    getTokenFromHeader(req) {
        const token = req.headers['authorization'];
        if (!token) {
            return null;
        }
        return token.replace('Bearer ', '');
    }
}

module.exports = JwtService.getInstance();