var express = require('express');
var router = express.Router();


const {body, validationResult} = require('express-validator');

var {findTestElementsAndTemplateByTestId} = require('../services/TestElementService')
var {isAdmin, loggedIn, findAllUsers, findUserById} = require('../services/UserService')
var {findTestsByUserId} = require('../services/TestService')


/**
 * - shows list of all users
 * - shows data for one user
 */
router.get('/', isAdmin, function (req, res, next) {


    findAllUsers().then(users => {
        res.render('admin/users', {users: users});
    }).catch(error => {

            let msg = 'Unable to get user list from database';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        }
    );

}).get('/:id', loggedIn, function (req, res, next) {

    findUserById(req.params.id).then(user => {
        res.render('user', {user: user});
    }).catch(error => {
        let msg = 'Unable to get user data';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:id/tests', isAdmin, function (req, res, next) {

    findTestsByUserId(req.params.id).then(tests => {
        res.render('admin/tests', {userId: req.params.id, tests: tests});
    }).catch(error => {
        let msg = 'Unable to get user tests';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).get('/:userId/tests/:id', isAdmin, function (req, res, next) {

    findTestElementsAndTemplateByTestId(req.params.id).then(testElements => {
        res.render('admin/test', {testElements: testElements, userId: req.params.userId, testId: req.params.id});
    }).catch(error => {
        let msg = 'Unable to get test elements';
        console.error(msg, error);
        res.render('error', {message: msg, error: error});
    });

}).post('/save', loggedIn, [body('age', 'Tu dois entrer un age entre 10 et 20 ans :)').isInt({ gt: 9, lt:21})], function (req, res, next) {

    let formUser = {id: req.body.login, age: req.body.age, level: req.body.level, sex: req.body.sex}

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        res.render('user', {errors: errors, user: formUser});

    } else {

        findUserById(formUser.id).then(user => {

            user.age = formUser.age;
            user.level = formUser.level;
            user.sex = req.body.sex;

            user.save().then(user => {

                console.info("user " + user.id + " updated");

                res.redirect(307, '/tests/example/show');

            }).catch(error => {
                let msg = 'Unable to update user: ' + user.id;
                console.error(msg, error);
                res.render('error', {message: msg, error: error});
            })

        }).catch(error => {
            let msg = 'Unable to get user data';
            console.error(msg, error);
            res.render('error', {message: msg, error: error});
        });
    }
});

module.exports = router;
