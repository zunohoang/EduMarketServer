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

connectDB();

auth.addAttributes(['ADMIN', 'STUDENT', 'TEACHER']);

app.use('/api/v1', routerCus);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});