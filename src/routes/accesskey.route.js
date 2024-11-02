const express = require('express');
const router = express.Router();
const accessKeyController = require('../controllers/accesskey.controller');

router.get('/', accessKeyController.getAccesskeys);
router.post('/', accessKeyController.createAccesskey);
router.get('/:id', accessKeyController.getAccesskeyById);
router.put('/active', accessKeyController.activeAccesskey);
router.put('/:id', accessKeyController.updateAccesskey);
router.delete('/:id', accessKeyController.deleteAccesskey);

module.exports = router;