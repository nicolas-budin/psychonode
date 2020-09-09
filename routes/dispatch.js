var express = require('express');
var router = express.Router();

var {findUserById} = require('./../services/OrmService')

/**
 * display welcome page when user is identified.
 */
router.post('/', function(req, res, next) {

  var login = req.body.login;

  findUserById(login).then(user => {
    res.render('dispatch', { user: user });
  }).catch(error => {
    let msg = 'Unable to get user data';
    console.error(msg, error);
    res.render('error', {message: msg, error: error});
  });

});

module.exports = router;