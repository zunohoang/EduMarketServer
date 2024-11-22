const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = 5000;
const routerCus = require('./routes');
const connectDB = require('./configs/db.config');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth.middleware');
require('dotenv').config();


app.use(bodyParser.json());

app.use(cors());

app.use(morgan('dev'));

// Cấu hình Express để phục vụ các file tĩnh từ thư mục `public`
app.use(express.static('public'));

connectDB();

auth.addAttributes(['ADMIN', 'STUDENT', 'TEACHER']);

const createMulter = require('./configs/multer.config');

const multer = createMulter('../public/courses');

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

module.exports = app;