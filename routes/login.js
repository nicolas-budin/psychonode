var express = require('express');
var router = express.Router();

var {findUserById} = require('../services/UserService')


router.get('/', function (req, res, next) {

    res.render('login');

}).post('/login', function (req, res, next) {

    var login = req.body.login;

    findUserById(login).then(user => {


        res.redirect('/users/' + user.id);

     }).catch(error => {
        let msg = 'Unable to log user ' + login;
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

});

module.exports = router;
