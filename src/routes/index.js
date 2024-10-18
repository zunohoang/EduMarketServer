const express = require('express');
const router = express.Router();
const userRouter = require('./UserRouter');

router.use('/users', userRouter);

module.exports = router;
