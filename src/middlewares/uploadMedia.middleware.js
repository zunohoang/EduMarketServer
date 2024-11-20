import { v2 as cloudinary } from 'cloudinary';

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: 'your_cloud_name',
    api_key: 'your_api_key',
    api_secret: 'your_api_secret',
});

export const uploadMedia = async (req, res, next) => {
    try {
        // Xử lý upload ảnh nếu có
        if (req.file && req.file.mimetype.startsWith('image/')) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'courses/images', // Thư mục để lưu ảnh
                public_id: `course-${req.body.id}-image`, // public_id có thể thay đổi tùy ý
            });
            req.body.image = result.secure_url; // Lưu URL ảnh vào request body
        }

        // Xử lý upload video nếu có
        if (req.video && req.video.mimetype.startsWith('video/')) {
            const videoResult = await cloudinary.uploader.upload(req.video.path, {
                resource_type: 'video', // Đảm bảo là video
                folder: 'courses/videos', // Thư mục để lưu video
                public_id: `course-${req.body.id}-video`, // public_id cho video
            });
            req.body.video = videoResult.secure_url; // Lưu URL video vào request body
        }

        // Tiếp tục đến controller tiếp theo
        next();
    } catch (error) {
        // Nếu có lỗi trong quá trình upload, trả về lỗi
        res.status(500).json({
            status: false,
            message: `Media upload error: ${error.message}`,
        });
    }
};
