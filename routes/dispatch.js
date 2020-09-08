var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {

  var login = req.body.login;
  res.render('dispatch', { login: login });
});


module.exports = router;