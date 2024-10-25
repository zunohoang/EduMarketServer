const AccessKey = require('../models/accessKey');

class AccessKeyService {

    // tao key moi
    async createAccessKey(data) {
        // genarate key
        data.key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(data.key);

        const accessKey = new AccessKey({
            key: data.key,
            user: data.user.id,
            status: data.status,
            courses: data.courses,
            createdAt: new Date(),
        });
        await accessKey.save();
        return accessKey;
    }

    async getAccessKeyById(id) {
        return await AccessKey.findById(id);
    }

    async getAccessKeyByKey(key) {
        return await AccessKey.findOne({ key: key });
    }

    async getAccessKeys() {
        return await AccessKey.find();
    }

    async deleteAccessKey(id) {
        return await AccessKey.findByIdAndDelete(id);
    }
}

module.exports = new AccessKeyService();