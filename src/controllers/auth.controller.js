// import 
const userServices = require('../services/user.service');
const jwt = require('../services/jwt.service');

// xu ly xac thu lay token va rfresh token
class AuthController {
    // signle pattern
    static instance = new AuthController();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (AuthController.instance) return AuthController.instance;
        AuthController.instance = this;
    }

    // login
    async login(req, res) {
        try {
            const { email, username, password } = req.body;
            if (!email && !username) {
                return res.status(400).json({ status: false, message: 'Missing email or username' });
            }
            if (!password) {
                return res.status(400).json({ status: false, message: 'Missing username or password' });
            }
            // check user
            const user = await userServices.getUserByUsername({ username });
            if (!user) {
                return res.status(400).json({ status: false, message: 'User not found' });
            }
            if (user.password !== password) {
                return res.status(400).json({ status: false, message: 'Password is incorrect' });
            }

            // gen token, rfresh token
            const accessToken = jwt.genAccessToken({ username: user.username, role: user.role });
            const refreshToken = jwt.genRefreshToken({ username: user.username, role: user.role });

            // save rfresh token
            user.refreshToken = refreshToken;
            await user.save();

            // response token
            res.json({ status: true, accessToken, refreshToken, user });


        } catch (e) {
            res.status(501).json({ status: false, message: e.message });
        }
    }

    // refresh token
    async refreshToken(req, res) {
        try {
            const refreshToken = jwt.getTokenFromHeader(req);
            if (!refreshToken) {
                return res.status(400).json({ status: false, message: 'Missing refresh token' });
            }
            // verify refresh token
            const user = await userServices.refreshToken(refreshToken);

            // gen token
            const accessToken = jwt.genAccessToken({ username: user.username, role: user.role });

            // response token
            res.json({ status: true, accessToken });

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    }

    // logout
    async logout(req, res) {
        try {
            const refreshToken = jwt.getTokenFromHeader(req);
            if (!refreshToken) {
                return res.status(400).json({ status: false, message: 'Missing refresh token' });
            }
            // remove rfresh token
            const user = await userServices.logout(refreshToken);

            // response
            res.json({ status: true });

        } catch (e) {
            res.status(500).json({ status: false, message: e.message });
        }
    }
}

module.exports = AuthController.getInstance();