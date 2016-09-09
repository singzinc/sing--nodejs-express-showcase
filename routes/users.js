var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/xxx', function(req, res, next) {
  res.send('respond with a resource xxx');
});


module.exports = router;
