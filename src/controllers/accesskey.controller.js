const accessKeyService = require('../services/accesskey.service');
const createMulter = require('../configs/multerConfig');
const multer = createMulter('public/bills');
const uploadBill = multer.single('file');

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
        uploadBill(req, res, async (err) => {
            if (err) {
                console.log(err)
                res.status(500).json({
                    status: false,
                    message: err.message
                })
            } else {
                console.log("dsds")
                const accessKey = JSON.parse(req.body.accessKey);
                if (req.file)
                    accessKey.bill = req.file.path.replace('public', '');
                try {
                    const newAccesskey = await accessKeyService.createAccesskey(accessKey);
                    console.log(newAccesskey);
                    res.json({
                        status: true,
                        data: newAccesskey
                    })
                } catch (error) {
                    console.log(error)
                    res.status(500).json({
                        status: false,
                        message: error.message
                    })
                }
            }
        })
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