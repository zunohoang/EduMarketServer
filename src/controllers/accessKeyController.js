const accessKeyService = require('../services/accessKeyService');

class AccessKeyController {

    // tao key moi
    async createAccessKey(req, res) {
        try {
            const data = req.body;
            data.user = req.user;
            const accessKey = await accessKeyService.createAccessKey(data);
            res.status(200).json(accessKey);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}

module.exports = new AccessKeyController();