const multer = require('multer');
const path = require('path');

const createMulter = (destination) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, destination);
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/webp'];
        if (!allowedTypes.includes(file.mimetype)) {
            const error = new Error('Invalid file type');
            error.code = 'INVALID_FILE_TYPE';
            return cb(error, false);
        }
        cb(null, true);
    };

    return multer({
        storage,
        fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5 // 5MB
        }
    });
};

module.exports = createMulter;