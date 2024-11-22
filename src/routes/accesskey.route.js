// const express = require('express');
// const router = express.Router();
// const accessKeyController = require('../controllers/accesskey.controller');
// const auth = require('../middlewares/auth.middleware');

// router.get('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.getAccesskeys);
// router.post('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.createAccesskey);
// router.get('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.getAccesskeyById);
// router.put('/active', accessKeyController.activeAccesskey);
// router.put('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.updateAccesskey);
// router.delete('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), accessKeyController.deleteAccesskey);

// module.exports = router;

const express = require('express');
const router = express.Router();
const AccessKeyController = require('../controllers/accesskey.controller');
const auth = require('../middlewares/auth.middleware');

router.put('/activate', AccessKeyController.activate);
router.get('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), AccessKeyController.getById);
router.get('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), AccessKeyController.getAll);
router.post('/', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), AccessKeyController.create);
router.put('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), AccessKeyController.update);
router.delete('/:id', auth.authorize(['ADMIN', 'TEACHER', 'COLLABORATOR']), AccessKeyController.delete);

module.exports = router;
