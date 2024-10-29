const jwt = require('jsonwebtoken');

const JWT_SECRET = 'secretdvdsvds-wf9ef09--90i90u';

class JwtServiceImpl extends JwtService {
    // gen token
    genarateToken(data) {
        return jwt.sign(data, JWT_SECRET, { expiresIn: '7d' });
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

module.exports = new JwtServiceImpl();