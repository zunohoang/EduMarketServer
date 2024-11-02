const Accesskey = require('../models/accesskey.model');
const courseService = require('./course.service');
const userService = require('./user.service');

class AccesskeyService {

    async getAccesskeys() {
        return Accesskey.find().populate('createdBy');
    }

    async getAccesskeyById(id) {
        return Accesskey.findById(id);
    }

    async createAccesskey(data) {
        return Accesskey.create(data);
    }

    async updateAccesskey(id, data) {
        return Accesskey.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteAccesskey(id) {
        return Accesskey.findByIdAndDelete(id);
    }

    async getAccesskeyByKey(key) {
        return Accesskey.findOne({ key });
    }

    async activeAccesskey(_key, userId) {
        const key = await this.getAccesskeyByKey(_key);
        // kiem tra con han
        if (key.expired < Date.now()) {
            return false;
        }
        if (key.status) {
            return false;
        }
        await userService.addCoursesToUser(userId, key.courses);
        key.status = true;
        key.usedBy = userId;
        await key.save();

        return key;
    }

}

module.exports = new AccesskeyService();