var express = require('express');
var router = express.Router();

var {findAllUsers} = require('./../services/OrmService')


/**
 * login form: list of user ids.
 */
router.get('/', function (req, res, next) {

    findAllUsers().then(users => {
        res.render('login', {users: users});
    }).catch(error => {

        let msg = 'Unable to get user list from database';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });
});

module.exports = router;
