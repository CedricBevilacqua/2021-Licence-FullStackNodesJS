var express = require('express');
var router = express.Router();

var groupsController = require('../controllers/groupsController');

/* GET groups page. */
router.get('/', groupsController.sendHTMLfile);
router.get('/all', groupsController.list);
router.post('/add', groupsController.add);
router.post('/remove', groupsController.remove);

module.exports = router;