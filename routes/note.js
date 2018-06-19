var express = require('express');
var router = express.Router();
var noteController = require('../controllers/noteControllers.js');

router.get('/', noteController.list);
router.get('/like', noteController.listLike);
router.get('/:id', noteController.show);
router.post('/', noteController.create);
router.post('/:id/update', noteController.update);

module.exports = router;