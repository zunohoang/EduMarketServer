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
        // random key kí tự viết hoa và số có độ dài 10 và không trùng với key đã có
        try {
            let key = "";
            let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
            console.log(data);
            do {
                key = "";
                for (let i = 0; i < 10; i++) {
                    key += characters.charAt(Math.floor(Math.random() * characters.length));
                }
                console.log(key);
            } while (await this.getAccesskeyByKey(key));
            console.log(data);
            data.key = data.platform + "_" + data.infix + key;
            console.log(data);
            delete data.platform;
            delete data.infix;
            data.createdAt = new Date(); // thêm thời điểm tạo
            console.log(data);
            data.expired = new Date().getTime() + Number(data.expired); // thêm thời gian hết hạn
            console.log(data);
            data.createdBy = data.createdBy; // thêm người tạo
            console.log(data);
            data.status = false;

            return Accesskey.create(data);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateAccesskey(id, data) {
        return Accesskey.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteAccesskey(id) {
        return Accesskey.findByIdAndDelete(id);
    }

    async getAccesskeyByKey(key) {
        return Accesskey.findOne({ key }).populate({
            path: 'courses',
            populate: {
                path: 'instructor'
            }
        });
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