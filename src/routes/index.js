const express = require('express');
const router = express.Router();
const userRouter = require('./userRouter');
const courseRouter = require('./courseRouter');

router.use('/users', userRouter);
router.use('/coueses', courseRouter);

module.exports = router;
