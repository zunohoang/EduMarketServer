const AccessKeyService = require('../services/accesskey.service');
const createMulter = require('../configs/multer.config');
const multer = createMulter('public/bills');
const uploadBill = multer.single('file');

class AccessKeyController {
    // signle pattern
    static instance = new AccessKeyController();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (AccessKeyController.instance) return AccessKeyController.instance;
        AccessKeyController.instance = this;
    }

    async getAll(req, res) {
        try {
            const accessKeys = await AccessKeyService.getAccessKeys();
            res.json({ status: true, data: accessKeys });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const accessKey = await AccessKeyService.getAccessKeyById(id);
            if (!accessKey) {
                return res.status(404).json({ status: false, message: 'Access Key not found' });
            }
            res.json({ status: true, data: accessKey });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    async create(req, res) {
        uploadBill(req, res, async (err) => {
            if (err) {
                return res.status(500).json({ status: false, message: err.message });
            }
            try {
                const accessKeyData = JSON.parse(req.body.accessKey);
                console.log(accessKeyData);
                if (req.file) accessKeyData.bill = req.file.path.replace('public', '');

                const newAccessKey = await AccessKeyService.createAccessKey(accessKeyData);
                res.json({ status: true, data: newAccessKey });
            } catch (error) {
                res.status(500).json({ status: false, message: error.message });
            }
        });
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const updatedAccessKey = await AccessKeyService.updateAccessKey(id, req.body);
            if (!updatedAccessKey) {
                return res.status(404).json({ status: false, message: 'Access Key not found' });
            }
            res.json({ status: true, data: updatedAccessKey });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletedAccessKey = await AccessKeyService.deleteAccessKey(id);
            if (!deletedAccessKey) {
                return res.status(404).json({ status: false, message: 'Access Key not found' });
            }
            res.json({ status: true, message: 'Deleted successfully' });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }

    async activate(req, res) {
        try {
            const { key, userId } = req.body;
            const result = await AccessKeyService.activeAccessKey(key, userId);
            if (!result) {
                return res.status(400).json({ status: false, message: 'Access Key expired or already used' });
            }
            res.json({ status: true, message: 'Activated successfully', data: result });
        } catch (error) {
            res.status(500).json({ status: false, message: error.message });
        }
    }
}

module.exports = AccessKeyController.getInstance();
