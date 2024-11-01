const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const courseRouter = require('./course.route');
const authRouter = require('./auth.route');

router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/auth', authRouter);

module.exports = router;
