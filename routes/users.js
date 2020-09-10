var express = require('express');
var router = express.Router();

var {findAllUsers, findUserById, findTestsByUserId, findTestElementsByTestId} = require('./../services/OrmService')

/**
 * - shows list of all users
 * - shows data for one user
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

}).get('/:id', function (req, res, next) {

    findUserById(req.params.id).then(user => {
        res.render('user', {user: user});
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:id/tests', function (req, res, next) {

    findTestsByUserId(req.params.id).then(tests => {
        res.render('tests', {userId: req.params.id, tests: tests});
    }).catch(error => {
        let msg = 'Unable to get user tests';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:userId/tests/:id', function (req, res, next) {

    findTestElementsByTestId(req.params.id).then(testElements => {
        res.render('test', {testElements: testElements});
    }).catch(error => {
        let msg = 'Unable to get test elements';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

});

module.exports = router;
