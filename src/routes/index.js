const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const courseRouter = require('./course.route');
const authRouter = require('./auth.route');
const accesskeyRouter = require('./accesskey.route');
const chatRouter = require('./chat.route');

router.use('/users', userRouter);
router.use('/courses', courseRouter);
router.use('/auth', authRouter);
router.use('/chats', chatRouter);
router.use('/access-keys', accesskeyRouter);

module.exports = router;
