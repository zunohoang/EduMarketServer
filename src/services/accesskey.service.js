const Accesskey = require('../models/accesskey.model');
const userService = require('./user.service');

class AccesskeyService {

    static instance = new AccesskeyService();

    static getInstance() {
        return this.instance;
    }

    constructor() {
        if (AccesskeyService.instance) return AccesskeyService.instance;
        AccesskeyService.instance = this;
    }

    async getAccessKeys() {
        return Accesskey.find().populate('createdBy');
    }

    async getAccessKeyById(id) {
        return Accesskey.findById(id);
    }

    async createAccessKey(data) {
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
            } while (await this.getAccessKeyByKey(key));
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

            return await Accesskey.create(data);
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    async updateAccessKey(id, data) {
        return Accesskey.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteAccessKey(id) {
        return Accesskey.findByIdAndDelete(id);
    }

    async getAccessKeyByKey(key) {
        return Accesskey.findOne({ key }).populate({
            path: 'courses',
            populate: {
                path: 'instructor'
            }
        });
    }

    async activeAccessKey(_key, userId) {
        const key = await this.getAccessKeyByKey(_key);
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

module.exports = AccesskeyService.getInstance();