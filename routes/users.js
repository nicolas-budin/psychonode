var express = require('express');
var router = express.Router();

var {findTestElementsAndTemplateByTestId} = require('../services/TestElementService')
var {findAllUsers, findUserById} = require('../services/UserService')
var {findTestsByUserId} = require('../services/TestService')


/**
 * - shows list of all users
 * - shows data for one user
 */
router.get('/', function (req, res, next) {


    findAllUsers().then(users => {
        res.render('admin/users', {users: users});
    }).catch(error => {

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
        res.render('admin/tests', {userId: req.params.id, tests: tests});
    }).catch(error => {
        let msg = 'Unable to get user tests';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:userId/tests/:id', function (req, res, next) {

    findTestElementsAndTemplateByTestId(req.params.id).then(testElements => {
        res.render('admin/test', {testElements: testElements, userId: req.params.userId, testId: req.params.id});
    }).catch(error => {
        let msg = 'Unable to get test elements';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).post('/save', function (req, res, next) {

    var login = req.body.login;

    findUserById(login).then(user => {

        // login
        if (req.body.age == undefined) {
            res.render('user', {user: user});

            // save form
        } else {

            // form is not correctly filled
            if (req.body.age == '' || req.body.level == '' || req.body.sex == '') {
                res.render('user', {user: user});

                // save form
            } else {

                user.age = req.body.age;
                user.level = req.body.level;
                user.sex = req.body.sex;
                user.save().then(user => {

                    console.info("user " + user.id + " updated");

                    res.redirect(307, '/tests/example/show');

                }).catch(error => {
                    let msg = 'Unable to update user: ' + user.id;
                    console.error(msg, error);
                    res.render('error', {message: msg, error: error});
                })
            }
        }
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });


});

module.exports = router;
