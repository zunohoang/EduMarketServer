const express = require('express');
const router = express.Router();
const accessKeyController = require('../controllers/accesskey.controller');
const auth = require('../middlewares/auth.middleware');

router.get('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.getAccesskeys);
router.post('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.createAccesskey);
router.get('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.getAccesskeyById);
router.put('/active', accessKeyController.activeAccesskey);
router.put('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.updateAccesskey);
router.delete('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.deleteAccesskey);

module.exports = router;