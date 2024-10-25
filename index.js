const express = require('express');
const app = express();
const morgan = require('morgan');
const port = 5000;
const routerCus = require('./src/routes');
const connectDB = require('./src/configs/db');
const bodyParser = require('body-parser');
const auth = require('./src/middlewares/authMiddlewares');

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

app.use(morgan('dev'));

// Cấu hình Express để phục vụ các file tĩnh từ thư mục `public`
app.use(express.static('public'));

connectDB();

auth.addAttributes(['ADMIN', 'STUDENT', 'TEACHER']);

const createMulter = require('./src/configs/multerConfig');

const multer = createMulter('public/courses');

app.post('/upload', multer.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send({
            message: 'Vui lòng chọn file'
        });
    }
    res.send({
        message: 'Upload file thành công',
        file: req.file
    });
});

app.use('/api/v1', routerCus);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});