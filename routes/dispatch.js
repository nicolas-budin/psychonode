var express = require('express');
var router = express.Router();


router.get('/', function (req, res, next) {

    res.render('message', {message: "dispatcher"});

});

module.exports = router;