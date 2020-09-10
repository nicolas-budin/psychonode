var express = require('express');
var router = express.Router();

var {findUserById} = require('./../services/OrmService')

/**
 * display welcome page when user is identified.
 */
router.get('/:id', function (req, res, next) {

    findUserById(req.params.id).then(user => {
        res.render('user', {user: user});
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

});

module.exports = router;