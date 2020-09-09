var express = require('express');
var router = express.Router();

var {findAllUsers} = require('./../services/OrmService')

/**
 * shows list of all users
 */
router.get('/', function (req, res, next) {

    findAllUsers((users) => {
            res.render('users', {users: users});
        }, error => {

            let msg = 'Unable to get user list from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

});

module.exports = router;
