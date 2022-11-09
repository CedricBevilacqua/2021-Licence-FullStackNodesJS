var express = require('express');
var router = express.Router();

var studentsController = require('../controllers/studentsController');

/* GET students page. */
router.get('/', studentsController.sendHTMLfile);
router.get('/all', studentsController.list);
router.post('/create', studentsController.create);
router.post('/remove', studentsController.remove);

module.exports = router;