const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');
const accessKeyRouter = require('./accessKeyRouter');

router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/access-keys', accessKeyRouter);

module.exports = router;
