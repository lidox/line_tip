var express = require('express');
var router = express.Router();

router.get('/', function (req, res) { 
	res.render('index', {testScript: 'tests/posts.js'});
});

module.exports = router;