const accessKeyService = require('../services/accesskey.service');

class AccesskeyController {

    async getAccesskeys(req, res) {
        try {
            const accesskeys = await accessKeyService.getAccesskeys();
            res.json({
                status: true,
                data: accesskeys
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async createAccesskey(req, res) {
        try {
            const accesskey = req.body;
            const newAccesskey = await accessKeyService.createAccesskey(accesskey);
            res.json({
                status: true,
                data: newAccesskey
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async getAccesskeyById(req, res) {
        try {
            const id = req.params.id;
            const accesskey = await accessKeyService.getAccesskeyById(id);
            if (!accesskey) {
                res.status(404).json({
                    status: false,
                    message: "Khong tim thay key"
                })
            } else {
                res.json({
                    status: true,
                    data: accesskey
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async updateAccesskey(req, res) {
        try {
            const id = req.params.id;
            const data = req.body;
            const accesskey = await accessKeyService.updateAccesskey(id, data);
            if (!accesskey) {
                res.status(404).json({
                    status: false,
                    message: "Khong tim thay key"
                })
            } else {
                res.json({
                    status: true,
                    data: accesskey
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async deleteAccesskey(req, res) {
        try {
            const id = req.params.id;
            const accesskey = await accessKeyService.deleteAccesskey(id);
            if (!accesskey) {
                res.status(404).json({
                    status: false,
                    message: "Khong tim thay key"
                })
            } else {
                res.json({
                    status: true,
                    data: accesskey
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

    async activeAccesskey(req, res) {
        try {
            const { key, userId } = req.body;
            const result = await accessKeyService.activeAccesskey(key, userId);
            if (result) {
                res.json({
                    status: true,
                    message: "Kich hoat thanh cong",
                    key: result
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "Khoa hoc da het han hoac da duoc su dung"
                })
            }
        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message
            })
        }
    }

}

module.exports = new AccesskeyController();